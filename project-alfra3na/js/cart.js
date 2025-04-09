// بيانات المنتجات (عادة تأتي من قاعدة بيانات)
const products = {
    1: { name: "عباية سوداء مطرزة", price: 499 },
    2: { name: "عباية كحلي مزينة", price: 599 }
};

// عرض محتويات السلة
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    let total = 0;

    cartContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <h3>${products[item.id].name}</h3>
            <p>السعر: ${products[item.id].price} جنيه</p>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button onclick="removeItem(${item.id})">حذف</button>
        </div>
    `).join('');

    // حساب الإجمالي
    total = cartItems.reduce((sum, item) => sum + (products[item.id].price * item.quantity), 0);
    document.getElementById('total').textContent = total;
}

// تحديث الكمية
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// حذف منتج
function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// التحميل الأولي
window.onload = renderCart;


document.getElementById('whatsapp-btn').addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const products = {
        1: { name: "عباية سوداء مطرزة", price: 499 },
        2: { name: "عباية كحلي مزينة", price: 599 }
    };
    
    // نص الرسالة
    let message = "مرحبًا، أريد طلب هذه المنتجات:\n";
    let total = 0;
    
    cartItems.forEach(item => {
        message += `- ${products[item.id].name} (الكمية: ${item.quantity}) - ${products[item.id].price * item.quantity} جنيه\n`;
        total += products[item.id].price * item.quantity;
    });
    
    message += `\nالإجمالي: ${total} جنيه\n`;
    message += `الاسم: _________\nالعنوان: _________`;
    message += `رقم هاتف 1: _________\رقم هاتف 2: _________`;
    // تشفير النص لإرساله عبر واتساب
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201554889377?text=${encodedMessage}`, '_blank');
});
const numbeer = document.getElementById('customer-number').value || "________";
const name = document.getElementById('customer-name').value || "________";
const address = document.getElementById('customer-address').value || "________";
message += `الاسم: ${name}\nالعنوان: ${address}`;