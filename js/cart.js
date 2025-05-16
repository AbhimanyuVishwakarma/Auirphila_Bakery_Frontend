// Shopping Cart Functionality for AuIrphila Bakery

document.addEventListener('DOMContentLoaded', function() {
    // Cart state
    let cart = [];
    
    // Load cart from localStorage if available
    function loadCart() {
        const savedCart = localStorage.getItem('auIrphilaCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('auIrphilaCart', JSON.stringify(cart));
    }
    
    // Add item to cart
    function addToCart(id, name, price, quantity = 1) {
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === id);
        
        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item if it doesn't exist
            cart.push({
                id: id,
                name: name,
                price: parseFloat(price),
                quantity: quantity
            });
        }
        
        // Save cart and update UI
        saveCart();
        updateCartCount();
        showCartNotification();
    }
    
    // Remove item from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        updateCartCount();
        
        // If on cart page, update the cart display
        if (document.querySelector('.cart-items')) {
            renderCartItems();
            updateCartTotal();
        }
    }
    
    // Update item quantity
    function updateQuantity(id, quantity) {
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or negative
                removeFromCart(id);
            } else {
                // Update quantity
                cart[itemIndex].quantity = quantity;
                saveCart();
                
                // If on cart page, update the cart display
                if (document.querySelector('.cart-items')) {
                    updateCartTotal();
                }
            }
        }
    }
    
    // Calculate cart total
    function calculateTotal() {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }
    
    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
            cartCount.textContent = itemCount;
            
            // Show/hide the count based on whether there are items
            if (itemCount > 0) {
                cartCount.style.display = 'flex';
            } else {
                cartCount.style.display = 'none';
            }
        }
    }
    
    // Show notification when item is added to cart
    function showCartNotification() {
        const notification = document.querySelector('.cart-notification');
        if (notification) {
            notification.classList.add('show');
            
            // Remove the class after animation completes
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
    
    // Render cart items on cart page
    function renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            // Show empty cart message
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <a href="../index.html" class="btn">Continue Shopping</a>
                </div>
            `;
            return;
        }
        
        // Generate HTML for cart items
        let cartHTML = '';
        
        cart.forEach(item => {
            const itemTotal = (item.price * item.quantity);
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-price">₹${item.price}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <div class="item-total">₹${itemTotal}</div>
                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        
        // Add event listeners to quantity buttons and remove buttons
        const quantityInputs = cartItemsContainer.querySelectorAll('.quantity-input');
        const decreaseButtons = cartItemsContainer.querySelectorAll('.decrease');
        const increaseButtons = cartItemsContainer.querySelectorAll('.increase');
        const removeButtons = cartItemsContainer.querySelectorAll('.remove-item-btn');
        
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                updateQuantity(itemId, parseInt(this.value));
            });
        });
        
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const input = this.nextElementSibling;
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    updateQuantity(itemId, currentValue - 1);
                }
            });
        });
        
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const input = this.previousElementSibling;
                const currentValue = parseInt(input.value);
                input.value = currentValue + 1;
                updateQuantity(itemId, currentValue + 1);
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                removeFromCart(itemId);
            });
        });
    }
    
    // Update cart total on cart page
    function updateCartTotal() {
        const subtotalElement = document.querySelector('.cart-subtotal-amount');
        const shippingElement = document.querySelector('.cart-shipping-amount');
        const totalElement = document.querySelector('.cart-total-amount');
        
        if (!subtotalElement || !totalElement) return;
        
        const subtotal = calculateTotal();
        const shipping = subtotal > 0 ? 200.00 : 0.00; // ₹200 shipping, free if cart is empty
        const tax = subtotal * 0.05; // 5% tax
        const total = subtotal + shipping + tax;
        
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        if (shippingElement) {
            shippingElement.textContent = `₹${shipping.toFixed(2)}`;
        }
        totalElement.textContent = `₹${total.toFixed(2)}`;
        
        // Update checkout button state
        const checkoutButton = document.querySelector('.checkout-btn');
        if (checkoutButton) {
            if (cart.length === 0) {
                checkoutButton.disabled = true;
                checkoutButton.classList.add('disabled');
            } else {
                checkoutButton.disabled = false;
                checkoutButton.classList.remove('disabled');
            }
        }
    }
    
    // Initialize cart functionality
    // Modify the initCart function to handle both button classes
    function initCart() {
        // Load cart from localStorage
        loadCart();
        
        // Add event listeners to "Add to Cart" buttons (both classes)
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id || this.dataset.productId;
                const name = this.dataset.name || this.dataset.productName;
                const price = this.dataset.price || this.dataset.productPrice;
                
                addToCart(id, name, price);
            });
        });
        
        // If on cart page, render cart items and total
        if (document.querySelector('.cart-items')) {
            renderCartItems();
            updateCartTotal();
        }
        
        // If on checkout page, populate order summary
        if (document.querySelector('.order-summary')) {
            populateOrderSummary();
        }
    }
    
    // Populate order summary on checkout page
    function populateOrderSummary() {
        const orderSummaryContainer = document.querySelector('.order-summary-items');
        const orderTotalElement = document.querySelector('.order-total-amount');
        
        if (!orderSummaryContainer || !orderTotalElement) return;
        
        // Generate HTML for order summary items
        let summaryHTML = '';
        
        cart.forEach(item => {
            const itemTotal = (item.price * item.quantity);
            
            summaryHTML += `
                <div class="summary-item">
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-quantity">x${item.quantity}</span>
                    </div>
                    <div class="item-price">₹${itemTotal}</div>
                </div>
            `;
        });
        
        orderSummaryContainer.innerHTML = summaryHTML;
        
        // Update order total
        const total = calculateTotal();
        orderTotalElement.textContent = `₹${total}`;
    }
    
    // Initialize cart
    initCart();
});

// Add this function to your cart.js file
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    const cartHeader = document.querySelector('.cart-header');
    const cartFooter = document.querySelector('.cart-footer');
    
    if (cart.length === 0) {
        if (cartHeader) cartHeader.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
    } else {
        if (cartHeader) cartHeader.style.display = 'grid';
        if (cartFooter) cartFooter.style.display = 'flex';
        if (emptyCart) emptyCart.style.display = 'none';
    }
}

// Call this function after loading the cart and after any cart modifications
// Add this function to preserve payment options and billing details
function preserveCheckoutState() {
    // Get the current cart state
    const currentCart = JSON.parse(localStorage.getItem('auIrphilaCart')) || [];
    
    // Store the payment method selection
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (selectedPaymentMethod) {
        localStorage.setItem('selectedPaymentMethod', selectedPaymentMethod.value);
    }
    
    // Update order summary with current cart items
    updateOrderSummary();
    
    return true; // Allow the checkout to proceed
}

// Modify the existing updateOrderSummary function
function updateOrderSummary() {
    const orderSummaryContainer = document.querySelector('.order-summary-items');
    const subtotalElement = document.querySelector('.order-subtotal-amount');
    const totalElement = document.querySelector('.order-total-amount');
    
    if (!orderSummaryContainer || !subtotalElement || !totalElement) return;
    
    // Get cart from localStorage
    // Initialize cart array from localStorage or create empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count in header
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    }
    
    // Add item to cart
    function addToCart(id, name, price) {
        // Create cart item object
        const item = {
            id: id,
            name: name,
            price: parseInt(price),
            quantity: 1
        };
        
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === id);
        
        if (existingItemIndex > -1) {
            // Increase quantity if item already in cart
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cart.push(item);
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show notification
        alert("Item added to cart!");
    }
    
    // Event listeners for Add to Cart buttons
    document.addEventListener('DOMContentLoaded', function() {
        // Update cart count on page load
        updateCartCount();
        
        // Add event listeners to all Add to Cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const productName = this.dataset.productName;
                const productPrice = this.dataset.productPrice;
                
                addToCart(productId, productName, productPrice);
            });
        });
        
        // Display cart items if on cart page
        if (window.location.href.includes('cart.html')) {
            displayCartItems();
        }
    });
    
    // Display cart items on cart page
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            // Cart is empty
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <a href="pages/category/categories.html" class="btn">Continue Shopping</a>
                </div>
            `;
            return;
        }
        
        // Create HTML for cart items
        let cartHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Calculate subtotal
        let subtotal = 0;
        
        // Add each cart item to the table
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            cartHTML += `
                <tr data-id="${item.id}">
                    <td>
                        <div class="cart-product">
                            <h3>${item.name}</h3>
                            <p>₹${item.price}</p>
                        </div>
                    </td>
                    <td>
                        <div class="quantity-control">
                            <button class="quantity-btn decrease" onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                    </td>
                    <td>₹${itemTotal}</td>
                    <td>
                        <button class="remove-item" onclick="removeItem('${item.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        
        cartHTML += `
                </tbody>
            </table>
        `;
        
        // Display cart items
        cartItemsContainer.innerHTML = cartHTML;
        
        // Calculate and display totals
        const tax = subtotal * 0.05;
        const total = subtotal + tax;
        
        document.getElementById('subtotal').textContent = `₹${subtotal}`;
        document.getElementById('tax').textContent = `₹${tax}`;
        document.getElementById('total').textContent = `₹${total}`;
    }
    
    // Update item quantity
    function updateQuantity(id, change) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            
            // Remove item if quantity is 0
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            // Save cart and update display
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        }
    }
    
    // Remove item from cart
    function removeItem(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            
            // Save cart and update display
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        }
    }
}
