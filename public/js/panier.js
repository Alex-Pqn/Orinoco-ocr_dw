
const orders = JSON.parse(localStorage.getItem('orders') )
const prices = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

if (localStorage.length > 0) {
    for (let i = 0; i < orders.length; i++) {
        createElement(
            orders[i].nameProduct,
            orders[i].customChoiceProduct,
            orders[i].priceProduct
        );
        prices.push(orders[i].priceProduct)
    }
    totalPrice(prices);
    clearAllProducts();
} else {
    console.log("Le panier semble être vide...")
    displayErrorPage();
}

function displayErrorPage() {
    document.querySelector(".error-empty").style.display = "block";
    document.querySelector(".panier").style.display = "none";
}

function clearAllProducts() {
    const button = document.querySelector("button")

    button.addEventListener('click', event => {
        window.localStorage.clear();
        location.reload();
    })
}

function totalPrice(price) {
    const totalPrice = prices.reduce(reducer);

    let main = document.querySelector(".panier__recap__total-price span")
    let totalPriceText = document.createTextNode(totalPrice)
    main.appendChild(totalPriceText)
}

function createElement(name, custom, price) {
    let main = document.querySelector(".panier__recap__products")
    let containerStorage = document.createElement("div");
    let nameContainer = document.createElement("div")
    let customContainer = document.createElement("div")
    let priceContainer = document.createElement("div")

    containerStorage.className = "row panier__recap__products__container "
    nameContainer.className = "offset-lg-2 col-lg-2 text-left"
    nameContainer.id = "nameStorageJS"
    customContainer.className = "offset-lg-1 col-lg-3 text-left"
    customContainer.id = "customStorageJS"
    priceContainer.className = "offset-lg-1 col-lg-2 text-left"
    priceContainer.id = "priceStorageJS"

    let nameStorageText = document.createTextNode(name)
    let customStorageText = document.createTextNode(custom)
    let priceStorageText = document.createTextNode(price + " €")

    main.appendChild(containerStorage)
    containerStorage.appendChild(nameContainer)
    containerStorage.appendChild(customContainer)
    containerStorage.appendChild(priceContainer)
    nameContainer.appendChild(nameStorageText);
    customContainer.appendChild(customStorageText);
    priceContainer.appendChild(priceStorageText); 
}