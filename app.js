// Product Objects and Array
const products = [
  { name: 'Product 1', price: 10, quantity: 0, productId: 1 },
  { name: 'Product 2', price: 20, quantity: 0, productId: 2 },
  { name: 'Product 3', price: 30, quantity: 0, productId: 3 },
];

let cart = [];
let balance = 0;

// Helper: Find Product by ID
function getProductById(productId) {
  return products.find((product) => product.productId === productId);
}

// Add Product to Cart
function addProductToCart(productId) {
  const product = getProductById(productId);
  const cartItem = cart.find((item) => item.productId === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update Cart UI
function updateCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  cartItemsElement.innerHTML = '';

  let total = 0;

  cart.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.quantity} - $${
      item.price * item.quantity
    }`;

    // Add buttons for +, -, and remove
    const increaseBtn = createButton('+', () =>
      increaseQuantity(item.productId)
    );
    const decreaseBtn = createButton('-', () =>
      decreaseQuantity(item.productId)
    );
    const removeBtn = createButton('Remove', () =>
      removeProductFromCart(item.productId)
    );

    listItem.appendChild(increaseBtn);
    listItem.appendChild(decreaseBtn);
    listItem.appendChild(removeBtn);

    cartItemsElement.appendChild(listItem);

    total += item.price * item.quantity;

  });

  cartTotalElement.textContent = total;

}

// Create Button Helper
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

// Quantity Handlers
function increaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) cartItem.quantity++;
  updateCart();
}

function decreaseQuantity(productId) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem.quantity > 1) {
    cartItem.quantity--;
  } else {
    removeProductFromCart(productId);
  }
  updateCart();
}

function removeProductFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  updateCart();
}

// Calculate Total
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Handle Checkout
function checkout() {
  const amount = parseFloat(document.getElementById('payment').value);
  const total = cartTotal();

  if (amount >= total) {
    alert(`Thank you! Payment successful. Your change is $${amount - total}`);
    cart = [];
    updateCart();
  } else {
    alert(`Insufficient amount! You still need $${total - amount}`);
  }

   document.getElementById('payment').value = '';
}

// Event Listeners
document.querySelectorAll('.add-to-cart').forEach((button) =>
  button.addEventListener('click', (event) => {
    const productId = parseInt(event.target.getAttribute('data-product-id'));
    addProductToCart(productId);
  })
);

document.getElementById('checkout-btn').addEventListener('click', checkout);
