
const orders = JSON.parse(localStorage.getItem('orders')) //get "orders" array on localStorage in JSON format
const prices = []; //declare array to store all the prices (in the cart) and make the total price below
const reducer = (accumulator, currentValue) => accumulator + currentValue; //declare reducer for calculate the total price (addition)

//display error page when nothing in the cart
displayErrorPage = () => {
    document.querySelector(".error-empty").style.display = "block";
    document.querySelector(".cart").style.display = "none";
}

//generate html&css and display all products in cart
createElement = (name, lensesChoice, price, index) => {
    //elements creation
    const main = document.querySelector(".cart__recap__products");
    const container = document.createElement("div");
    const nameElement = document.createElement("p");
    const lensesElement = document.createElement("p");
    const priceElement = document.createElement("p");
    const buttonElement = document.createElement("button");
    const nameText = document.createTextNode(name);
    const lensesText = document.createTextNode(lensesChoice);
    const priceText = document.createTextNode(price + " €");
    const crossImg = document.createElement("img")

    //elements attributes
    crossImg.setAttribute('src', "/public/img/crossCart.svg")
    buttonElement.setAttribute('value', index);
    buttonElement.setAttribute('onclick', "clearProductOfChoice(value);");

    //elements classnames
    container.className = "row cart__recap__products__container";
    nameElement.className = "offset-lg-1 col-lg-2 text-left";
    lensesElement.className = "offset-lg-1 col-lg-3 text-left";
    priceElement.className = "offset-lg-1 col-lg-2 text-left";
    buttonElement.className = "col-lg-1"

    //parents & childs elements
    main.appendChild(container);
    container.appendChild(nameElement);
    container.appendChild(lensesElement);
    container.appendChild(priceElement);
    container.appendChild(buttonElement);
    buttonElement.appendChild(crossImg);
    nameElement.appendChild(nameText);
    lensesElement.appendChild(lensesText);
    priceElement.appendChild(priceText); 
}

//delete product of choice in cart when click on the "X" button correspond
//this function is called above in the attribute 'onclick' button on "createElement" function
clearProductOfChoice = (indexButton) => {
    orders.splice(indexButton, 1)
    localStorage.setItem("orders", JSON.stringify(orders))
    location.reload();
}

//display total price of products in cart
totalPrice = () => {
    const main = document.querySelector(".cart__recap__total-price span");

    const totalPrice = prices.reduce(reducer); //get all the prices in cart (stored in "prices" array) and calculate the total
    const totalPriceText = document.createTextNode(totalPrice); //display the total price

    main.appendChild(totalPriceText);
}

//clear the localStorage when click on the button "Vider le panier (-x)"
clearAllProducts = () => {
    const button = document.querySelector(".cart__recap__clear");

    button.addEventListener('click', event => {
        window.localStorage.clear(); //clear the localStorage
        location.reload(); //reload page to display the change
    })
}

if (localStorage.length === 0 || orders.length === 0) { //if there is nothing in the cart, display error page
    displayErrorPage();
} else { //if there is at least one element
    for (let i = 0; i < orders.length; i++) {
        createElement(
            orders[i].nameProduct,
            orders[i].lensesChoiceProduct,
            orders[i].priceProduct,
            i
        );
        prices.push(orders[i].priceProduct)
    }
    totalPrice(prices);
    clearAllProducts();
}