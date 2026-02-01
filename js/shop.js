const cart = [];

function addToCart(index) {
    const product = products[index];
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartDiv = document.getElementById('cart'); // get the cart div

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, idx) => {
        total += item.price;
        const li = document.createElement('li');
        li.style.color = '#ffffff'; 
        li.textContent = `${item.name} - ${item.price.toFixed(2)}€`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);

    // Show the cart only if it has items
    if (cart.length > 0) {
        cartDiv.style.display = 'block';
    } else {
        cartDiv.style.display = 'none';
    }
}

function clearCart() {
    let text = '';
    if(window.html_lang === "PT") {
        text = 'O carrinho já está vazio!';
    } else {
        text = 'The cart is already empty!';
    }

    if(cart.length === 0) {
        alert(text);
        return;
    }
    cart.length = 0; // empty the cart
    updateCart();
}

function checkout() {
    let text = '';
    let text_empty = '';
    if(window.html_lang === "PT") {
        text = 'Compra concluída! Total:';
        text_empty = 'O carrinho está vazio!';
    } else {
        text = 'Purchase completed! Total:';
        text_empty = 'The cart is empty!';
    }

    if(cart.length === 0) {
        alert(text_empty);
    } else {
        alert(`${text} €${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
        cart.length = 0; // Clear the cart
        updateCart();
    }
}

function loadProducts() {
    const productsContainer = document.getElementById('products');
    let text = '';
    if(window.html_lang === "PT") {
        text = 'Adicionar ao Carrinho';
    } else {
        text = 'Add to Cart';
    }

    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = `
            <div class="text-center mt-4">
                <button class="btn btn-buy" onclick="addToCart(${index})">${text}</button>
                <button class="btn btn-buy" onclick="openProductModal(${index})"><i class="bi bi-search"></i></button>
            </div>
            
            <div class="services-thumb" onclick="openProductModal(${index})">
                <img src="../../images/services/${product.image}" class="services-image 
                    img-fluid" alt="${product.name}"> 
                <div class="services-info d-flex align-items-end justify-content-between p-2">
                    <h4 class="mb-0">${product.name}</h4>
                    <strong class="services-thumb-price">€${product.price.toFixed(2)}</strong>
                </div>
            </div>
        `;
        productsContainer.appendChild(div);
    });
}


function openProductModal(index) {
    const product = products[index];
    console.log(product);

    // Fill modal content
    document.getElementById('modal-image').src = `../../images/services/${product.image}`;
    document.getElementById('modal-image').alt = product.name;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-price').textContent = `€${product.price.toFixed(2)}`;
    document.getElementById('modal-description').textContent = product.description;

    // Set Add to Cart button
    const addCartBtn = document.getElementById('modal-add-cart');
    addCartBtn.onclick = function() {
        addToCart(index);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide(); // close modal
    }
    console.log(addCartBtn);
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
    console.log("Modal opened");
    console.log(modal);
}


document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
})