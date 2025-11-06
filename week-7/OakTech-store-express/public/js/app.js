// Tiny cart using localStorage for the public site
const CART_KEY = 'simple_cart';

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(productId, qty = 1) {
  const cart = loadCart();
  const item = cart.find(i => i.productId === productId);
  if (item) item.qty += qty; else cart.push({ productId, qty });
  saveCart(cart);
  alert('Added to cart!');
}

document.addEventListener('click', (e) => {
  if (e.target.matches('.add-to-cart')) {
    addToCart(e.target.dataset.id, 1);
  }
});
