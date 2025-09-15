// Fetch and render products
async function fetchProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = p.imageUrl || 'https://via.placeholder.com/300x150?text=Product';
    img.alt = p.name;
    const title = document.createElement('h3');
    title.textContent = p.name;
    const desc = document.createElement('p');
    desc.textContent = p.description;
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = ₹${p.price};
    const actions = document.createElement('div');
    actions.className = 'actions';
    const addBtn = document.createElement('button');
    addBtn.className = 'btn primary';
    addBtn.textContent = 'Add to cart';
    addBtn.onclick = () => addToCart(p);
    actions.appendChild(addBtn);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(price);
    card.appendChild(actions);
    container.appendChild(card);
  });
  updateCartCount();
}

async function addToCart(product) {
  await fetch('/api/cart/add', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(product)
  });
  updateCartCount();
}

// Cart modal logic
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkout');

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));
clearCartBtn.addEventListener('click', clearCart);
checkoutBtn.addEventListener('click', () => alert('Checkout demo — integrate a payment gateway to proceed.'));

async function openCart() {
  const res = await fetch('/api/cart');
  const items = await res.json();
  renderCart(items);
  cartModal.classList.remove('hidden');
}

function renderCart(items) {
  cartItemsEl.innerHTML = '';
  let total = 0;
  if (items.length === 0) {
    cartItemsEl.innerHTML = '<li>Your cart is empty</li>';
  } else {
    items.forEach(i => {
      const li = document.createElement('li');
      const img = document.createElement('img'); img.src = i.imageUrl || 'https://via.placeholder.com/60';
      const name = document.createElement('div'); name.textContent = i.name;
      const price = document.createElement('div'); price.textContent = ₹${i.price};
      const remove = document.createElement('button'); remove.className = 'btn'; remove.textContent = 'Remove';
      remove.onclick = async () => {
        await fetch(/api/cart/remove/${i.id}, { method: 'DELETE' });
        const updated = await (await fetch('/api/cart')).json();
        renderCart(updated);
        updateCartCount();
      };
      const meta = document.createElement('div'); meta.style.flex = '1'; meta.appendChild(name); meta.appendChild(price);
      li.appendChild(img);
      li.appendChild(meta);
      li.appendChild(remove);
      cartItemsEl.appendChild(li);
      total += i.price;
    });
  }
  cartTotalEl.textContent = Total: ₹${total};
}

async function updateCartCount(){
  const res = await fetch('/api/cart');
  const items = await res.json();
  cartCountEl.textContent = items.length;
}

async function clearCart() {
  await fetch('/api/cart/clear', { method: 'POST' });
  renderCart([]);
  updateCartCount();
}

fetchProducts();
