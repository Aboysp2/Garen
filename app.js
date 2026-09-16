// Translation Dictionary
const translations = {
  ar: {
    searchPlaceholder: "ابحث عن منتج (مثال: iPhone 15, MacBook, Watch)...",
    searchBtn: "بحث",
    categoriesTitle: "الفئات",
    catAll: "الكل",
    catSmartphones: "هواتف ذكية",
    catPCs: "كمبيوتر ولابتوب",
    catTablets: "أجهزة لوحية",
    catWatches: "ساعات ذكية",
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
    searchPlaceholder: "Search for a product (e.g., iPhone 15, MacBook, Watch)...",
    searchBtn: "Search",
    categoriesTitle: "Categories",
    catAll: "All",
    catSmartphones: "Smartphones",
    catPCs: "PCs & Laptops",
    catTablets: "Tablets",
    catWatches: "Smartwatches",
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

// Multi-Category Sample Dataset
const sampleProducts = [
  // --- SMARTPHONES ---
  {
    id: 1,
    category: "smartphones",
    title: {
      ar: "آيفون 15 بروك ماكس 256 جيجابايت - تيتانيوم طبيعي",
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
    category: "smartphones",
    title: {
      ar: "سامسونج جالاكسي S24 ألترا 512 جيجابايت - رمادي تيتانيوم",
      en: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray"
    },
    image: "https://m.media-amazon.com/images/I/71WkJ-p7m4L._AC_SL1500_.jpg",
    prices: [
      { store: "Amazon.sa", price: 4899, url: "https://amazon.sa" },
      { store: "Noon", price: 4799, url: "https://noon.com" },
      { store: "Jarir", price: 5099, url: "https://jarir.com" },
      { store: "Extra", price: 4999, url: "https://extra.com" }
    ]
  },

  // --- PCS & LAPTOPS ---
  {
    id: 3,
    category: "pcs",
    title: {
      ar: "أبل ماك بوك اير 13 بوصة M3 شريحة - 256 جيجابايت رمادي فلكي",
      en: "Apple MacBook Air 13\" M3 Chip - 256GB Space Gray"
    },
    image: "https://m.media-amazon.com/images/I/71ItM4a8etL._AC_SL1500_.jpg",
    prices: [
      { store: "Jarir", price: 4599, url: "https://jarir.com" },
      { store: "Amazon.sa", price: 4399, url: "https://amazon.sa" },
      { store: "Extra", price: 4499, url: "https://extra.com" },
      { store: "Noon", price: 4429, url: "https://noon.com" }
    ]
  },
  {
    id: 4,
    category: "pcs",
    title: {
      ar: "لابتوب ألعاب لينوفو ليجون 5 برو - Core i7, RTX 4060",
      en: "Lenovo Legion 5 Pro Gaming Laptop - Core i7, RTX 4060"
    },
    image: "https://m.media-amazon.com/images/I/61Kq-S7iSUL._AC_SL1000_.jpg",
    prices: [
      { store: "Extra", price: 5899, url: "https://extra.com" },
      { store: "Jarir", price: 5999, url: "https://jarir.com" },
      { store: "Amazon.sa", price: 5699, url: "https://amazon.sa" }
    ]
  },

  // --- TABLETS ---
  {
    id: 5,
    category: "tablets",
    title: {
      ar: "أبل آيباد برو 11 بوصة M4 شريحة - 256 جيجابايت واي فاي",
      en: "Apple iPad Pro 11\" M4 Chip - 256GB Wi-Fi"
    },
    image: "https://m.media-amazon.com/images/I/61uA2UVnYWL._AC_SL1500_.jpg",
    prices: [
      { store: "Jarir", price: 4199, url: "https://jarir.com" },
      { store: "Amazon.sa", price: 3999, url: "https://amazon.sa" },
      { store: "Noon", price: 4049, url: "https://noon.com" },
      { store: "Extra", price: 4149, url: "https://extra.com" }
    ]
  },
  {
    id: 6,
    category: "tablets",
    title: {
      ar: "سامسونج جالاكسي تاب S9 ألترا 12.4 بوصة مع قلم S Pen",
      en: "Samsung Galaxy Tab S9 Ultra 12.4\" with S Pen"
    },
    image: "https://m.media-amazon.com/images/I/71LJJrKee2L._AC_SL1500_.jpg",
    prices: [
      { store: "Amazon.sa", price: 3499, url: "https://amazon.sa" },
      { store: "Extra", price: 3599, url: "https://extra.com" },
      { store: "Jarir", price: 3699, url: "https://jarir.com" }
    ]
  },

  // --- SMARTWATCHES ---
  {
    id: 7,
    category: "watches",
    title: {
      ar: "أبل watch ألترا 2 الهيكل من التيتانيوم 49 مم",
      en: "Apple Watch Ultra 2 Titanium Case 49mm"
    },
    image: "https://m.media-amazon.com/images/I/71XMTL5T11L._AC_SL1500_.jpg",
    prices: [
      { store: "Amazon.sa", price: 3199, url: "https://amazon.sa" },
      { store: "Noon", price: 3149, url: "https://noon.com" },
      { store: "Jarir", price: 3299, url: "https://jarir.com" },
      { store: "Extra", price: 3249, url: "https://extra.com" }
    ]
  },
  {
    id: 8,
    category: "watches",
    title: {
      ar: "سامسونج جالاكسي watch 6 كلاسيك 47 مم",
      en: "Samsung Galaxy Watch 6 Classic 47mm"
    },
    image: "https://m.media-amazon.com/images/I/61Kq-S7iSUL._AC_SL1000_.jpg",
    prices: [
      { store: "Extra", price: 1099, url: "https://extra.com" },
      { store: "Amazon.sa", price: 999, url: "https://amazon.sa" },
      { store: "Noon", price: 1049, url: "https://noon.com" },
      { store: "Panda", price: 1120, url: "https://panda.com.sa" }
    ]
  }
];

// Helper: XSS Prevention
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Helper: Debounce for Input Performance
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

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('ltr', lang === 'en');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  document.getElementById('langToggleBtn').textContent = t.toggleLang;

  renderProducts(sampleProducts);
}

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  const selectedStores = Array.from(document.querySelectorAll('#storeFilters input:checked')).map(cb => cb.value);
  const activeCategory = document.querySelector('#categoryFilters input:checked').value;
  const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
  const t = translations[currentLang];

  grid.innerHTML = '';
  
  // Filter products by category, stores, and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesStore = product.prices.some(p => selectedStores.includes(p.store));
    const title = (product.title[currentLang] || product.title.en).toLowerCase();
    const matchesSearch = title.includes(searchQuery);

    return matchesCategory && matchesStore && matchesSearch;
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

// Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
  setLanguage('ar');

  // Toggle Language
  document.getElementById('langToggleBtn').addEventListener('click', () => {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  });

  // Debounced Search Input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', debounce(() => {
    renderProducts(sampleProducts);
  }, 300));

  // Store Filters
  document.querySelectorAll('#storeFilters input').forEach(checkbox => {
    checkbox.addEventListener('change', () => renderProducts(sampleProducts));
  });

  // Category Radio Filters
  document.querySelectorAll('#categoryFilters input').forEach(radio => {
    radio.addEventListener('change', () => renderProducts(sampleProducts));
  });
});
