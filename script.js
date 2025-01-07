document.addEventListener('DOMContentLoaded', () => {
    

    const products = [
        { id: 1, name: "Product 1", price: 29.99, imageUrl: "1.png" },
        { id: 2, name: "Product 2", price: 25.99, imageUrl: "2.png" },
        { id: 3, name: "Product 3", price: 26.99, imageUrl: "3.png" },
        { id: 4, name: "Product 4", price: 27.99, imageUrl: "3.png" },
    ];
    

    // Load cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    //JSON.parse is essential for converting the stored string data back into
    //  a usable Javascript object or array

    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMsg = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkOutBtn = document.getElementById('checkout-btn');


    // Display products
products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" style="width:300px; height:210px;" />
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id='${product.id}'>Add To Cart</button>
    `;
    productList.appendChild(productDiv);
});


    // Add event listener for adding products to the cart
    productList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        cartList.innerHTML = "";  // Clear current cart list
        let totalPrice = 0;
    
        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden');  // Hide empty cart message
            cartTotalMsg.classList.remove('hidden');   // Show cart total message

            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}" style="width:200px; height:auto;"  />
                    ${item.name} - $${item.price.toFixed(2)}  
                    <button data-index='${index}' class='remove-btn'>Remove</button>
                `;
                cartList.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove('hidden');  // Show empty cart message
            cartList.innerHTML = "Cart is empty"; // Display message
            totalPriceDisplay.textContent = "$0.00";       // Set total price to $0.00
            cartTotalMsg.classList.add('hidden');          // Hide cart total message
        }
    
        saveProduct();
    }
    

    // Event delegation for removing items from the cart
    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.getAttribute("data-index"));
            removeFromCart(index);
        }
    });

    function removeFromCart(index) {
        cart.splice(index, 1); // Remove the item from the cart
        renderCart(); // Re-render the cart to reflect changes
    }

    checkOutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            alert("Checkout successful");
            cart.length = 0; // Clear the cart after checkout
            renderCart(); // Update view after checkout
        } else {
            alert("Your cart is empty.");
        }
    });

    function saveProduct() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Initial rendering of the cart from local storage
    renderCart();
});
