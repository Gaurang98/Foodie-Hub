// Menu Data
const menuItems = {
    pizza: [
        { id: 1, name: 'Margherita Pizza', desc: 'Fresh tomatoes, mozzarella, and basil', price: 599, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', category: 'pizza' },
        { id: 2, name: 'Pepperoni Pizza', desc: 'Classic pepperoni with cheese', price: 699, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', category: 'pizza' },
        { id: 3, name: 'Veggie Supreme', desc: 'Bell peppers, mushrooms, onions, olives', price: 649, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', category: 'pizza' }
    ],
    burgers: [
        { id: 4, name: 'Classic Cheeseburger', desc: 'Beef patty with cheese, lettuce, tomato', price: 399, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80', category: 'burgers' },
        { id: 5, name: 'Chicken Deluxe', desc: 'Grilled chicken with special sauce', price: 449, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80', category: 'burgers' },
        { id: 6, name: 'Veggie Burger', desc: 'Plant-based patty with fresh veggies', price: 349, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80', category: 'burgers' }
    ],
    pasta: [
        { id: 7, name: 'Spaghetti Carbonara', desc: 'Creamy pasta with bacon and parmesan', price: 549, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80', category: 'pasta' },
        { id: 8, name: 'Penne Arrabbiata', desc: 'Spicy tomato sauce with herbs', price: 499, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80', category: 'pasta' },
        { id: 9, name: 'Fettuccine Alfredo', desc: 'Rich creamy white sauce pasta', price: 599, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80', category: 'pasta' }
    ],
    desserts: [
        { id: 10, name: 'Chocolate Cake', desc: 'Rich chocolate cake with frosting', price: 249, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', category: 'desserts' },
        { id: 11, name: 'Cheesecake', desc: 'Creamy New York style cheesecake', price: 299, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80', category: 'desserts' },
        { id: 12, name: 'Ice Cream Sundae', desc: 'Vanilla ice cream with toppings', price: 199, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', category: 'desserts' }
    ]
};

// Cart State
let cart = [];

// User Profile Data
let userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, New Delhi, India'
};

let isEditingProfile = false;

// Order History
const orderHistory = [
    { id: '#ORD-001', date: '2024-09-20', items: ['Margherita Pizza', 'Chocolate Cake'], total: 848, status: 'Delivered' },
    { id: '#ORD-002', date: '2024-09-18', items: ['Classic Burger', 'Ice Cream Sundae'], total: 598, status: 'Delivered' },
    { id: '#ORD-003', date: '2024-09-15', items: ['Spaghetti Carbonara'], total: 549, status: 'Delivered' }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderPopularItems();
    renderProfileInfo();
    renderOrderHistory();
    updateCartBadge();
});

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    document.getElementById('navMenu').classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Render cart when cart section is shown
    if (sectionId === 'cart') {
        renderCart();
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
    document.querySelector('.nav-toggle').classList.toggle('active');
}

// Profile Dropdown Toggle
function toggleProfile() {
    document.getElementById('profileDropdown').classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.profile-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        document.getElementById('profileDropdown').classList.remove('show');
    }
});

// Render Menu Items
function renderMenu(category = 'all') {
    const menuContainer = document.getElementById('menuItems');
    let itemsToShow = [];
    
    if (category === 'all') {
        Object.values(menuItems).forEach(items => {
            itemsToShow = itemsToShow.concat(items);
        });
    } else {
        itemsToShow = menuItems[category] || [];
    }
    
    menuContainer.innerHTML = itemsToShow.map(item => `
        <div class="product-card">
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80'">
            </div>
            <div class="product-content">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-desc">${item.desc}</p>
                <div class="product-footer">
                    <span class="product-price">₹${item.price}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Menu by Category
function filterMenu(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    renderMenu(category);
}

// Render Popular Items (Home Page)
function renderPopularItems() {
    const popularItems = [
        { name: "Margherita Pizza", price: "₹599", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80" },
        { name: "Classic Burger", price: "₹399", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
        { name: "Creamy Pasta", price: "₹549", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80" }
    ];
    
    const container = document.getElementById('popularItems');
    container.innerHTML = popularItems.map(item => `
        <div class="popular-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80'">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(itemId) {
    let allItems = [];
    Object.values(menuItems).forEach(items => {
        allItems = allItems.concat(items);
    });
    
    const item = allItems.find(i => i.id === itemId);
    
    if (item) {
        const existingItem = cart.find(c => c.id === itemId);
        
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ ...item, qty: 1 });
        }
        
        updateCartBadge();
        alert(`${item.name} added to cart!`);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
    updateCartBadge();
}

function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (item) {
        item.qty += change;
        if (item.qty < 1) {
            item.qty = 1;
        }
        renderCart();
        updateCartBadge();
    }
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartBadge').textContent = totalItems;
    document.getElementById('totalItems').textContent = totalItems;
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2);
}

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't added any delicious food to your cart yet.</p>
                <a href="#" class="cta-button" onclick="showSection('menu')">Browse Menu</a>
            </div>
        `;
        return;
    }
    
    const subtotal = getCartTotal();
    const deliveryFee = 40;
    const tax = (parseFloat(subtotal) * 0.08).toFixed(2);
    const total = (parseFloat(subtotal) + deliveryFee + parseFloat(tax)).toFixed(2);
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&q=80'">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                        <p class="item-price">₹${item.price}</p>
                    </div>
                    <div class="item-controls">
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" ${item.qty <= 1 ? 'disabled' : ''}>-</button>
                            <span class="qty-display">${item.qty}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <p class="item-total">₹${(item.price * item.qty).toFixed(2)}</p>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
                <span>Subtotal (${cart.reduce((sum, item) => sum + item.qty, 0)} items):</span>
                <span>₹${subtotal}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee:</span>
                <span>₹${deliveryFee}</span>
            </div>
            <div class="summary-row">
                <span>Tax (8%):</span>
                <span>₹${tax}</span>
            </div>
            <div class="summary-row total">
                <span><strong>Total:</strong></span>
                <span><strong>₹${total}</strong></span>
            </div>
            <button class="checkout-btn" onclick="handleCheckout()">Place Order</button>
        </div>
    `;
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = getCartTotal();
    const orderNum = 'FH' + Date.now().toString().slice(-6);
    
    alert(`🎉 Order Placed Successfully!\n\nOrder #: ${orderNum}\nTotal: ₹${total}\n\nYour delicious food will be delivered in 30-45 minutes!\n\nThank you for ordering with Foodie Hub!`);
    
    // Clear cart
    cart = [];
    updateCartBadge();
    showSection('home');
}

// Profile Functions
function renderProfileInfo() {
    const initials = userProfile.name.split(' ').map(n => n[0]).join('');
    document.getElementById('avatarInitials').textContent = initials;
    
    const infoGrid = document.getElementById('profileInfo');
    infoGrid.innerHTML = `
        <div class="info-item">
            <label>Full Name</label>
            <span>${userProfile.name}</span>
            <input type="text" id="editName" value="${userProfile.name}">
        </div>
        <div class="info-item">
            <label>Email Address</label>
            <span>${userProfile.email}</span>
            <input type="email" id="editEmail" value="${userProfile.email}">
        </div>
        <div class="info-item">
            <label>Phone Number</label>
            <span>${userProfile.phone}</span>
            <input type="tel" id="editPhone" value="${userProfile.phone}">
        </div>
        <div class="info-item full-width">
            <label>Delivery Address</label>
            <span>${userProfile.address}</span>
            <textarea id="editAddress" rows="3">${userProfile.address}</textarea>
        </div>
    `;
}

function renderOrderHistory() {
    const container = document.getElementById('orderHistory');
    container.innerHTML = orderHistory.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">${order.id}</span>
                <span class="order-status">${order.status}</span>
            </div>
            <div class="order-items">
                <p><strong>Items:</strong> ${order.items.join(', ')}</p>
            </div>
            <div class="order-total">
                Total: ₹${order.total}
            </div>
        </div>
    `).join('');
}

function toggleEditProfile() {
    isEditingProfile = !isEditingProfile;
    const btn = document.getElementById('editBtn');
    const infoItems = document.querySelectorAll('.info-item');
    
    if (isEditingProfile) {
        btn.textContent = 'Save Changes';
        infoItems.forEach(item => item.classList.add('editing'));
    } else {
        // Save changes
        userProfile.name = document.getElementById('editName').value;
        userProfile.email = document.getElementById('editEmail').value;
        userProfile.phone = document.getElementById('editPhone').value;
        userProfile.address = document.getElementById('editAddress').value;
        
        btn.textContent = 'Edit Profile';
        infoItems.forEach(item => item.classList.remove('editing'));
        renderProfileInfo();
        
        alert('Profile updated successfully!');
    }
}

// Contact Form
function handleContactSubmit(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    e.target.reset();
}

// Logout
function logout() {
    alert('Logout functionality coming soon!');
    toggleProfile();
}

// Close dropdown when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('profileDropdown').classList.remove('show');
    });
});
