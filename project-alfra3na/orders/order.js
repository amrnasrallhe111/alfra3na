document.addEventListener('DOMContentLoaded', function() {
    // محاكاة البحث عن طلب
    document.getElementById('track-btn').addEventListener('click', function() {
        const orderNumber = document.getElementById('order-number').value.trim();
        
        if (!orderNumber) {
            alert('الرجاء إدخال رقم الطلب');
            return;
        }
        
        // هنا سيتم جلب بيانات الطلب من السيرفر
        // هذه مجرد محاكاة للوظيفة
        simulateOrderTracking(orderNumber);
    });
    
    // محاكاة جلب بيانات الطلب
    function simulateOrderTracking(orderNumber) {
        // عرض رسالة تحميل
        const orderStatus = document.getElementById('order-status');
        orderStatus.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>جاري جلب بيانات الطلب ${orderNumber}...</p>
            </div>
        `;
        
        // محاكاة تأخير الشبكة
        setTimeout(() => {
            // في الواقع هنا ستأتي البيانات من API
            const orderData = {
                status: 'preparing',
                products: [
                    { name: 'عباية سوداء مطرزة', price: 499, quantity: 1, size: 'M', image: '../images/women/abaya1.jpg' }
                ],
                shipping: 50,
                date: '25 مايو 2024 - 10:15 ص'
            };
            
            renderOrderDetails(orderNumber, orderData);
        }, 1500);
    }
    
    // عرض تفاصيل الطلب
    function renderOrderDetails(orderNumber, data) {
        let statusSteps = '';
        let productsList = '';
        
        // تحديد حالة الطلب
        const statusConfig = {
            received: { icon: 'fa-check', text: 'تم استلام الطلب', active: false },
            preparing: { icon: 'fa-tshirt', text: 'قيد التجهيز', active: true },
            shipping: { icon: 'fa-truck', text: 'الشحن', active: false },
            delivered: { icon: 'fa-home', text: 'التسليم', active: false }
        };
        
        // إنشاء خطوات التتبع
        for (const [key, step] of Object.entries(statusConfig)) {
            const isCompleted = key === 'received' || (key === 'preparing' && data.status !== 'received');
            const isActive = key === data.status;
            
            statusSteps += `
                <div class="step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
                    <div class="step-icon"><i class="fas ${step.icon}"></i></div>
                    <div class="step-text">
                        <h3>${step.text}</h3>
                        <p>${key === 'received' ? data.date : (isActive ? 'جاري العمل على طلبك' : '')}</p>
                    </div>
                </div>
            `;
        }
        
        // إنشاء قائمة المنتجات
        data.products.forEach(product => {
            productsList += `
                <div class="product-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>الكمية: ${product.quantity}</p>
                        <p>المقاس: ${product.size}</p>
                        <p class="price">${product.price} ج.م</p>
                    </div>
                </div>
            `;
        });
        
        // عرض كل البيانات
        document.getElementById('order-status').innerHTML = `
            <div class="status-progress">
                ${statusSteps}
            </div>
            
            <div class="order-details">
                <h2>تفاصيل الطلب #${orderNumber}</h2>
                <div class="products-list">
                    ${productsList}
                </div>
                <div class="order-summary">
                    <h3>ملخص الطلب</h3>
                    <div class="summary-row">
                        <span>الإجمالي</span>
                        <span>${data.products.reduce((sum, p) => sum + (p.price * p.quantity), 0)} ج.م</span>
                    </div>
                    <div class="summary-row">
                        <span>الشحن</span>
                        <span>${data.shipping} ج.م</span>
                    </div>
                    <div class="summary-row total">
                        <span>المبلغ النهائي</span>
                        <span>${data.products.reduce((sum, p) => sum + (p.price * p.quantity), 0) + data.shipping} ج.م</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // (اختياري) جلب رقم الطلب من URL إذا كان موجوداً
    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get('order');
    
    if (orderParam) {
        document.getElementById('order-number').value = orderParam;
        document.getElementById('track-btn').click();
    }
});
async function fetchOrder(orderNumber) {
    try {
        const response = await fetch(`/api/orders/${orderNumber}`);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}