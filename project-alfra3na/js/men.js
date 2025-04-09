document.addEventListener('DOMContentLoaded', function() {
    // فتح وإغلاق القائمة الجانبية للجوّال
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
    });
    
    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
    
    // إضافة منتج إلى السلة
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            
            // يمكنك هنا إضافة المنتج إلى السلة الفعلية
            const product = this.parentElement;
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;
            
            console.log(`تمت إضافة ${productName} بسعر ${productPrice} إلى السلة`);
        });
    });
});