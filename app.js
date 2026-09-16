// Translation Dictionary
const translations = {
  ar: {
    searchPlaceholder: "ابحث عن منتج (مثال: iPhone 15, TV)...",
    searchBtn: "بحث",
    supportedStores: "المتاجر المدعومة",
    resultsTitle: "نتائج المقارنة",
    productsFound: "منتجات متوفرة",
    noResults: "لا توجد نتائج تطابق الفلاتر المحددة",
    lowestPrice: "⚡ (الأرخص)",
    buyBtn: "الانتقال للمتجر والشراء",
    sar: "ر.س",
    toggleLang: "English"
  },
  en: {
    searchPlaceholder: "Search for a product (e.g., iPhone 15, TV)...",
    searchBtn: "Search",
    supportedStores: "Supported Stores",
    resultsTitle: "Comparison Results",
    productsFound: "products found",
    noResults: "No products match the selected filters",
    lowestPrice: "⚡ (Lowest)",
    buyBtn: "Compare & Shop",
    sar: "SAR",
    toggleLang: "العربية"
  }
};

let currentLang = "ar";

// Sample Products Data
const sampleProducts = [
  {
    id: 1,
    title: {
      ar: "آيفون 15 بروك ماكس 256 ججابايت - تيتانيوم طبيعي",
      en: "iPhone 15 Pro Max 256GB - Natural Titanium"
    },
    image: "https://m.media-amazon.com/images/I/81CgtwSII3L._AC_SL1500_.jpg",
    prices: [
      { store: "Amazon.sa", price: 4699, url: "https://amazon.sa" },
      { store: "Noon", price: 4649, url: "https://noon.com" },
      { store: "Jarir", price: 4799, url: "https://jarir.com" },
      { store: "Extra", price: 4749, url: "https://extra.com" }
    ]
  },
  {
    id: 2,
    title: {
      ar: "تلفزيون سامسونج 65 بوصة 4K UHD ذكي",
      en: "Samsung 65-Inch 4K UHD Smart TV"
    },
    image: "https://m.media-amazon.com/images/I/71LJJrKee2L._AC_SL1500_.jpg",
    prices: [
      { store: "Amazon.sa", price: 2199, url: "https://amazon.sa" },
      { store: "Extra", price: 2099, url: "https://extra.com" },
      { store: "Panda", price: 2249, url: "https://panda.com.sa" },
      { store: "Carrefour", price: 2149, url: "https://carrefourksar.com" }
    ]
  },
  {
    id: 3,
    title: {
      ar: "نسكافيه جولد قهوة سريعة التحضير 200 جرام",
      en: "Nescafe Gold Instant Coffee 200g"
    },
    image: "https://m.media-amazon.com/images/I/61Kq-S7iSUL._AC_SL1000_.jpg",
    prices: [
      { store: "Panda", price: 34.95, url: "https://panda.com.sa" },
      { store: "Carrefour", price: 32.50, url: "https://carrefourksar.com" },
      { store: "Amazon.sa", price: 36.00, url: "https://amazon.sa" },
      { store: "Noon", price: 35.00, url: "https://noon.com" }
    ]
  }
];

// Helper: Escape HTML (XSS Prevention)
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Helper: Debounce for Search Input
function debounce(func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Switch Language and Update UI Text & Direction
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Update HTML direction & lang attribute
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('ltr', lang === 'en');

  // Update static UI elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  document.getElementById('langToggleBtn').textContent = t.toggleLang;

  // Re-render products in new language
  renderProducts(sampleProducts);
}

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  const selectedStores = Array.from(document.querySelectorAll('#storeFilters input:checked')).map(cb => cb.value);
  const t = translations[currentLang];

  grid.innerHTML = '';
  
  const filteredProducts = products.filter(product => {
    return product.prices.some(p => selectedStores.includes(p.store));
  });

  countEl.textContent = `${filteredProducts.length} ${t.productsFound}`;

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div class="no-results">${t.noResults}</div>`;
    return;
  }

  filteredProducts.forEach(product => {
    const validPrices = product.prices.filter(p => selectedStores.includes(p.store));
    const minPrice = Math.min(...validPrices.map(p => p.price));
    const titleText = product.title[currentLang] || product.title.en;

    const card = document.createElement('div');
    card.className = 'product-card';

    const priceListHtml = validPrices.map(p => {
      const isBest = p.price === minPrice;
      return `
        <li class="price-item ${isBest ? 'best-price' : ''}">
          <span>${escapeHTML(p.store)}</span>
          <span>${p.price.toFixed(2)} ${t.sar} ${isBest ? t.lowestPrice : ''}</span>
        </li>
      `;
    }).join('');

    card.innerHTML = `
      <img src="${escapeHTML(product.image)}" alt="${escapeHTML(titleText)}" loading="lazy" />
      <h4>${escapeHTML(titleText)}</h4>
      <ul class="price-list">${priceListHtml}</ul>
      <a href="${escapeHTML(validPrices[0].url)}" target="_blank" rel="noopener noreferrer" class="buy-btn">${t.buyBtn}</a>
    `;

    grid.appendChild(card);
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  setLanguage('ar');

  // Toggle Language Handler
  document.getElementById('langToggleBtn').addEventListener('click', () => {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  });

  // Debounced Search Handler
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.trim().toLowerCase();
    const filtered = sampleProducts.filter(p => {
      const title = (p.title[currentLang] || p.title.en).toLowerCase();
      return title.includes(query);
    });
    renderProducts(filtered);
  }, 300));

  // Store Filter Checkboxes
  document.querySelectorAll('#storeFilters input').forEach(checkbox => {
    checkbox.addEventListener('change', () => renderProducts(sampleProducts));
  });
});
