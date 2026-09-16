// Sample Data
const sampleProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB - Natural Titanium",
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
    title: "Samsung 65-Inch 4K UHD Smart TV",
    image: "https://m.media-amazon.com/images/I/71LJJrKee2L._AC_SL1500_.jpg",
    prices: [
      { store: "Amazon.sa", price: 2199, url: "https://amazon.sa" },
      { store: "Extra", price: 2099, url: "https://extra.com" },
      { store: "Panda", price: 2249, url: "https://panda.com.sa" },
      { store: "Carrefour", price: 2149, url: "https://carrefourksar.com" }
    ]
  }
];

// Helper: Escape HTML (XSS Prevention)
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Helper: Debounce Function for Performance
function debounce(func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  const selectedStores = Array.from(document.querySelectorAll('#storeFilters input:checked')).map(cb => cb.value);

  grid.innerHTML = '';
  
  const filteredProducts = products.filter(product => {
    return product.prices.some(p => selectedStores.includes(p.store));
  });

  countEl.textContent = `${filteredProducts.length} منتجات متوفرة`;

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div class="no-results">لا توجد نتائج تطابق الفلاتر المحددة</div>`;
    return;
  }

  filteredProducts.forEach(product => {
    const validPrices = product.prices.filter(p => selectedStores.includes(p.store));
    const minPrice = Math.min(...validPrices.map(p => p.price));

    const card = document.createElement('div');
    card.className = 'product-card';

    const priceListHtml = validPrices.map(p => {
      const isBest = p.price === minPrice;
      return `
        <li class="price-item ${isBest ? 'best-price' : ''}">
          <span>${escapeHTML(p.store)}</span>
          <span>${p.price.toFixed(2)} ر.س ${isBest ? '⚡ (الأرخص)' : ''}</span>
        </li>
      `;
    }).join('');

    card.innerHTML = `
      <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.title)}" loading="lazy" />
      <h4>${escapeHTML(product.title)}</h4>
      <ul class="price-list">${priceListHtml}</ul>
      <a href="${escapeHTML(validPrices[0].url)}" target="_blank" rel="noopener noreferrer" class="buy-btn">الانتقال للمتجر والشراء</a>
    `;

    grid.appendChild(card);
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(sampleProducts);

  const searchInput = document.getElementById('searchInput');
  
  // Applied Debounce to Search Input
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.trim().toLowerCase();
    const filtered = sampleProducts.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
  }, 300));

  document.querySelectorAll('#storeFilters input').forEach(checkbox => {
    checkbox.addEventListener('change', () => renderProducts(sampleProducts));
  });
});
