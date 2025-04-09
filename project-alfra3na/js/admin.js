// عند تحميل الصفحة: جلب البيانات المحفوظة
document.addEventListener('DOMContentLoaded', function() {
    const savedProducts = localStorage.getItem('mazaneaProducts');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        updateProductsTable();
    }
});

// دالة لحفظ البيانات عند أي تغيير
function saveData() {
    localStorage.setItem('mazaneaProducts', JSON.stringify(products));
}
function addProduct() {
    // ... الكود السابق ...
    products.push(newProduct);
    saveData(); // <-- أضف هذه السطر
    updateProductsTable();
}

function editProduct(productId) {
    // ... الكود السابق ...
    saveData(); // <-- أضف هذه السطر
}

function deleteProduct(productId) {
    // ... الكود السابق ...
    saveData(); // <-- أضف هذه السطر
}
// دالة الإضافة
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const imageInput = document.getElementById('productImage');

    if (!name || !price || !category) {
        alert("الرجاء إدخال جميع البيانات!");
        return;
    }

    const newProduct = {
        id: Date.now(), // إنشاء رقم فريد
        name: name,
        price: price + " ج.م",
        category: category,
        image: imageInput.files.length > 0 ? 
               URL.createObjectURL(imageInput.files[0]) : 
               "images/default.jpg"
    };

    products.push(newProduct);
    saveToLocalStorage(); // <-- حفظ البيانات
    updateProductsTable();
    clearForm();
}

// دالة الحذف
function deleteProduct(productId) {
    if (confirm("هل أنت متأكد من الحذف؟")) {
        products = products.filter(p => p.id !== productId);
        saveToLocalStorage(); // <-- حفظ البيانات
        updateProductsTable();
    }
}
// عند تحميل الصفحة: جلب البيانات المحفوظة
window.onload = function() {
    const savedProducts = localStorage.getItem('mazaneaProducts');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        updateProductsTable();
    }
};

// دالة لحفظ البيانات في localStorage
function saveToLocalStorage() {
    localStorage.setItem('mazaneaProducts', JSON.stringify(products));
}