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
  },
  {
    id: 3,
    title: "Nescafe Gold Instant Coffee 200g",
    image: "https://m.media-amazon.com/images/I/61Kq-S7iSUL._AC_SL1000_.jpg",
    prices: [
      { store: "Panda", price: 34.95, url: "https://panda.com.sa" },
      { store: "Carrefour", price: 32.50, url: "https://carrefourksar.com" },
      { store: "Amazon.sa", price: 36.00, url: "https://amazon.sa" },
      { store: "Noon", price: 35.00, url: "https://noon.com" }
    ]
  }
];

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  const selectedStores = Array.from(document.querySelectorAll('#storeFilters input:checked')).map(cb => cb.value);

  grid.innerHTML = '';
  countEl.textContent = `${products.length} products found`;

  products.forEach(product => {
    // Filter prices based on active store checkboxes
    const filteredPrices = product.prices.filter(p => selectedStores.includes(p.store));

    if (filteredPrices.length === 0) return;

    // Find lowest price among available stores
    const minPrice = Math.min(...filteredPrices.map(p => p.price));

    const card = document.createElement('div');
    card.className = 'product-card';

    const priceListHtml = filteredPrices.map(p => {
      const isBest = p.price === minPrice;
      return `
        <li class="price-item ${isBest ? 'best-price' : ''}">
          <span>${p.store}</span>
          <span>${p.price.toFixed(2)} SAR ${isBest ? '(Lowest)' : ''}</span>
        </li>
      `;
    }).join('');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h4>${product.title}</h4>
      <ul class="price-list">${priceListHtml}</ul>
      <a href="${filteredPrices[0].url}" target="_blank" class="buy-btn">Compare & Shop</a>
    `;

    grid.appendChild(card);
  });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(sampleProducts);

  // Search Listener
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = sampleProducts.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
  });

  // Checkbox Filters Listener
  document.querySelectorAll('#storeFilters input').forEach(checkbox => {
    checkbox.addEventListener('change', () => renderProducts(sampleProducts));
  });
});
