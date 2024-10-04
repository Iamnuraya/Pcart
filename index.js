const cards = document.getElementsByClassName('card');
const cartBtn = document.getElementsByClassName('cart');
const incrementBtn = document.getElementsByClassName('increment');
const decrementBtn = document.getElementsByClassName('decrement');
const quantityElement = document.getElementsByClassName('add-quantity');
const dessertImage = document.getElementsByClassName('dessert-img');
const addToCart = document.getElementsByClassName('add-to-cart');
const confirm = document.getElementById('confirm');
const emptyCart = document.querySelector('.empty-cart');
const itemCart = document.querySelector('.items-cart');
const totalQuantity = document.querySelector('.total-quantity');
const cartTotal = document.querySelector('.cart-total');
const confirmTotal = document.querySelector('.confirm-total');
const removeButtons = document.getElementsByClassName('remove');
const orderItems = document.querySelector('.order-items');
const orderTotal = document.querySelector('.order-total');
const confirmContainer = document.querySelector('.confirm-order');


const desserts = [
    {
        Id: 1,
        nam: "Waffles" ,
        descrip: "Waffles and Beerries",
        price: 6.50,
        image: "./img/images/waffle.jpg"

    },
    {
    Id: 2 ,
    nam:" Creme Brule",
    descrip: "Vannila Brule Creme" ,
    price: 8.00,
    image: "./img/images/brulee.jpg" 

},
{
    Id: 3 ,
    nam: "Macaron",
    descrip: "Macaron Mix",
    price: 5.50,
    image: "./img/images/macaron.jpg"

}, 

{
    Id: 4,
    nam: "Tiramisu",
    descrip: "Classic Tiramisu",
    price: 5.50,
    image:"./img/images/tirasimu.jpg"

},

{
    Id: 5 ,
    nam: "Baklava",
    descrip: "Panstancho Baklava",
    price: 4.00,
    image: "./img/images/baklava.jpg"
},

{
    Id: 6 ,
    nam: "Pie" ,
    descrip: "Lemon Pie",
    price: 5.00 ,
    image:"./img/images/pie.jpg" 

},

{
    Id: 7 ,
    nam:" Cake" ,
    descrip: "Red Velvet Cake" ,
    price: 4.50,
    image:"./img/images/cake.jpg"

},

{
    Id: 8 ,
    nam: "Brownie",
    descrip: "Salid Caramel",
    price:5.50,
    image: "./img/images/brownie.jpg"

},

{
    Id: 9 ,
    nam: " Panna Cotta",
    descrip: "Vanilla Pana Cota" ,
    price: 4.50,
    image: "./img/images/panacota.jpg" 
}


]
console.log(desserts);

// async function getData() {
//     try {
//         let response = await fetch('./dataa.json');
//         let data = await response.json();
//         renderData(data);
//     } catch (error) {
//         console.log('An error occurred ', error)
//     }
// }

// getData();
//display items from data given
const itemsContainer = document.querySelector('.items-container')
// function renderData(data) {
//     itemsContainer.innerHTML = '';

    desserts.forEach((card, index) => {
        itemsContainer.innerHTML += `
        <div class="card" id=${index}>
            <div class="image">
                <img class='dessert-img' src=${card.image} alt="">
                <button class="cart">
                <img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart">Add to cart</button>
                <button class="add-to-cart">
                    <svg  xmlns="http://www.w3.org/2000/svg" class="decrement" width="25" height="25" fill="hsl(13, 31%, 94%)" viewBox="0 0 10 2"><path fill="hsl(13, 31%, 94%)" d="M0 .375h10v1.25H0V.375Z"/></svg>
                    <p class="add-quantity">0</p>
                    <svg class="increment"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="hsl(13, 31%, 94%)" viewBox="0 0 10 10"><path fill="hsl(13, 31%, 94%)" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </button>
            </div>
            <div class="data">
                <p class="category">${card.descrip}</p>
                <p class="name">${card.nam}</p>
                <p class="price">$ ${card.price.toFixed(2)}</p>
            </div>
        </div> `;
    });
    showCartBtn();
    addQuantity();
    removeQuantity();


//display cart button to add item to cart
function showCartBtn(params) {
    Array.from(cartBtn).forEach((cart, index) => {
        cart.addEventListener('click', () => {
            cart.style.display = 'none';
            addToCart[index].style.display = 'flex';
            quantityElement[index].textContent = '1';
            dessertImage[index].style.border = '4px solid hsl(14, 86%, 42%)';
            updateTotalQuantity();
            addItemsinCart();
        })
    });
}

//add items to the cart
function addQuantity(params) {
    Array.from(incrementBtn).forEach((plus, index) => {
        plus.addEventListener('click', () => {
            let quantity = parseInt(quantityElement[index].textContent);
            quantity++;
            quantityElement[index].textContent = quantity;
            dessertImage[index].style.border = '4px solid hsl(14, 86%, 42%)';
            updateTotalQuantity();
            addItemsinCart();
        })
    })
}

//remove items from the cart
function removeQuantity(params) {
    Array.from(decrementBtn).forEach((minus, index) => {
        minus.addEventListener('click', () => {
            let quantity = parseInt(quantityElement[index].textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement[index].textContent = quantity;
            }
            if (quantity === 0) {
                dessertImage[index].style.border = 'none';
            }
            updateTotalQuantity();
            addItemsinCart();
        })
    })
}

//Update total quantity in cart
function updateTotalQuantity() {
    let cartQuantity = 0;
    Array.from(cards).forEach(card => {
        const quantity = parseInt(card.querySelector('.add-quantity').textContent);
        cartQuantity += quantity;
    });
    totalQuantity.textContent = `(${cartQuantity})`;
}

//add items in the cart
function addItemsinCart() {
    emptyCart.style.display = 'none';
    itemCart.style.display = 'grid';
    confirmTotal.style.display = 'grid';

    let orderPrice = 0;
    itemCart.innerHTML = '';

    Array.from(cards).forEach((card, index) => {
        const quantity = parseInt(card.querySelector('.add-quantity').textContent);
        if (quantity > 0) {
            const name = card.querySelector('.name').textContent;
            const price = parseFloat(card.querySelector('.price').textContent.substring(1)).toFixed(2);
            let totalprice = (quantity * parseFloat(price)).toFixed(2);
            orderPrice += parseFloat(totalprice);
            const cartData = document.createElement('div');
            cartData.className = 'cart-data';
            cartData.innerHTML = `
            <div class="cart-details">
                <div class="info">
                    <h4 class="item-name">${name}</h4>
                    <div class="all">
                        <p class="show-quantity">${quantity}x</p>
                        <div class="display-price">
                            <p>@</p>
                            <p class="per-price">$ ${price}</p>
                            <p class="total-price">$ ${totalprice}</p>
                        </div>
                    </div>
                </div>
                <svg class="remove" id=${index} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="hsl(7, 20%, 60%)" viewBox="0 0 10 10"><path fill="hsl(7, 20%, 60%)" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </div>
            <hr>   `;
            itemCart.appendChild(cartData);
        }
        cartTotal.textContent = `$${(orderPrice).toFixed(2)}`;
        removeItem();
    })
}

//remove items from the cart
function removeItem(params) {
    Array.from(removeButtons).forEach(remove => {
        remove.addEventListener('click', () => {
            const productId = remove.getAttribute('id');
            const product = document.querySelector(`.card[id="${productId}"]`);
            product.querySelector('.add-quantity').textContent = '0';
            product.querySelector('.dessert-img').style.border = 'none';
            addItemsinCart();
            updateTotalQuantity();
        })
    })
}

//event listener on confirm order button
confirm.addEventListener('click', () => {
    overlay.style.display = 'flex';
    document.documentElement.scrollTop = 0;
    confirmOrder();
    confirmContainer.style.display = 'grid';
})
