
// PRODUCTS LIST PART
// "Récapitulatif de votre commande"

const orders = JSON.parse(localStorage.getItem('orders')); //get "orders" array on localStorage in JSON format
const prices = []; //declare array to store all the prices (in the cart) and make the total price in "totalPrice" function

//create html&css to display products in "orders" array localStorage in cart page
createElement = (name, lenses, price, index) => {
    //elements creation & selectors
    const main = document.querySelector(".cart__smry__products");
    const container = document.createElement("div");
    const nameElement = document.createElement("p");
    const lensesElement = document.createElement("p");
    const priceElement = document.createElement("p");
    const buttonElement = document.createElement("button");
    const nameText = document.createTextNode(name);
    const lensesText = document.createTextNode(lenses);
    const priceText = document.createTextNode(price + " €");
    const crossImg = document.createElement("img");

    //elements attributes
    crossImg.setAttribute('src', "/public/img/crossCart.svg");
    buttonElement.setAttribute('value', index); //add an attribute "value" to the elements with the index
    buttonElement.setAttribute('onclick', "clearProductOfChoice(value);"); //add an attribute "onlick" to the elements to call the "clearProductOfChoice" function with the index

    //elements classnames
    container.className = "row cart__smry__products__container";
    nameElement.className = "offset-lg-1 col-lg-2 col-md-3 col-sm-3 col-3 text-left";
    lensesElement.className = "offset-lg-1 col-lg-3 col-md-4 col-sm-5 col-6 text-left";
    priceElement.className = "offset-lg-1 col-lg-1 col-md-3 col-sm-3 col-3 text-left";
    buttonElement.className = "col-lg-1";

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
    orders.splice(indexButton, 1); //deletes the element whose index matches in the orders array
    localStorage.setItem("orders", JSON.stringify(orders)); //re set to make changes
    location.reload();

    //delete "orders" array and "totalPrice" in localStorage if it is empty (the array is empty but remains if we delete the last element in a personalized way)
    if (orders != undefined) {
        if (orders.length === 0) {
            localStorage.removeItem('orders');
            localStorage.removeItem('totalPrice');
            location.reload();
        }
    }
}

//calculate and display total price of products in cart (+ set the totalPrice in localStorage for the orderConfirmation page later)
totalPrice = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue; //declare reducer for calculate the total price (addition)
    const totalPrice = prices.reduce(reducer); //get all the prices in cart (stored in "prices" array) and calculate the total
    
    const main = document.querySelector(".cart__smry__total-price span");
    const totalPriceText = document.createTextNode(totalPrice);
    main.appendChild(totalPriceText);

    localStorage.setItem('totalPrice', totalPrice) //store the totalPrice in localStorage for the orderConfirmation page later
}

//remove the "orders" array in localStorage when click on the "Vider le panier" button
clearAllProducts = () => {
    const button = document.querySelector(".cart__smry__clear");

    button.addEventListener('click', event => {
        localStorage.removeItem('orders');
        localStorage.removeItem('totalPrice');
        location.reload();
    })
}

// FORM PART
// "Vos coordonnées"

let expressionsList;
let expressionValidationList;

let lastNameValue;
let fistNameValue;
let emailValue;
let addressValue;
let cityValue;

const errorsList = [
    "Cette case ne peut pas contenir de chiffre.",
    "Cette case ne peut pas contenir de caractères spéciaux.",
    "L'e-mail entré est invalide, veillez à bien l'orthographier.",
    "L'adresse entrée est invalide, veillez à bien l'orthographier."
]

//display the error corresponding to the problem in the form
displayErrorForm = (errorValue, expression) => {
    const errorForm = expression.errorForm;
    const displayError = document.querySelector(errorForm);
    displayError.textContent = errorValue;
}

//define regex and create an array with booleans 
//the "expressionList" array is passed to each line of the form (in formValidation function) and displays true or false depending on the value of the field
formExpressionValidation = (value) => {
    let expressionValidation = {
        regexContainsNumber : /\d+/, //contains numbers
        regexEmail : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/, //e-mail validation
        regexCaracters : /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/, //specials caracters
        regexAddress : /^[#.0-9a-zA-Z\s,-]+$/, //address validation
    }
    expressionsList = {
        regexContainsNumber : expressionValidation.regexContainsNumber.test(value),
        regexEmail : expressionValidation.regexEmail.test(value),
        regexCaracters : expressionValidation.regexCaracters.test(value),
        regexAddress : expressionValidation.regexAddress.test(value),
    };
}

//display form values ​​in variables and create an array with validations form preferencies and value
storeValuesForm = () => {
    lastNameValue = document.orderForm.lastName.value;
    firstNameValue = document.orderForm.firstName.value;
    emailValue = document.orderForm.Email.value;
    addressValue = document.orderForm.Address.value;
    cityValue = document.orderForm.City.value;

    expressionValidationList = [
        {
            value: lastNameValue, 
            stepValidation: false, 
            errorForm: "#lastName", 
            regexContainsNumber: true, 
            regexCaracters: true, 
            minLength: 3,
            maxLength: 16
        },
        {
            value: firstNameValue, 
            stepValidation: false, 
            errorForm: "#firstName", 
            regexContainsNumber: true, 
            regexCaracters: true, 
            minLength: 3,
            maxLength: 16
        },
        {
            value: emailValue, 
            stepValidation: false, 
            errorForm: "#Email", 
            regexEmail: false, 
            minLength: 4,
            maxLength: 24
        },
        {
            value: addressValue, 
            stepValidation: false, 
            errorForm: "#Address", 
            regexAddress: false, 
            minLength: 8,
            maxLength: 32
        },
        {
            value: cityValue, 
            stepValidation: false, 
            errorForm: "#City", 
            regexContainsNumber: true, 
            regexCaracters: true, 
            minLength: 3,
            maxLength: 16
        }
    ]
}

//compare "expressionsList" array and "expressionValidationList" array preferencies
formValidation = () => {
    expressionValidationList.forEach(expression =>{ 
        formExpressionValidation(expression.value) //the value passed in the form by user is tested with regex and return true or false boolean in "expressionsList" array

        if (expression.value.length < expression.minLength) {
            event.preventDefault()
            displayErrorForm("Vous devez entrer au minimum " + expression.minLength + " caractères.", expression);
        } 
        else if (expression.value.length > expression.maxLength) {
            event.preventDefault()
            displayErrorForm("Vous ne pouvez entrer qu'au maximum " + expression.maxLength + " caractères.", expression);
        }
        else if (expressionsList.regexContainsNumber === expression.regexContainsNumber) {
            event.preventDefault()
            displayErrorForm(errorsList[0], expression);
        }
        else if (expressionsList.regexEmail === expression.regexEmail) {
            event.preventDefault()
            displayErrorForm(errorsList[2], expression);
        }
        else if (expressionsList.regexCaracters === expression.regexCaracters) {
            event.preventDefault()
            displayErrorForm(errorsList[1], expression);
        }
        else if (expressionsList.regexAddress === expression.regexAddress) {
            event.preventDefault()
            displayErrorForm(errorsList[3], expression);
        }
        else {
            expression.stepValidation = true;
            displayErrorForm("", expression);
            if (expressionValidationList[0].stepValidation === true &&
                expressionValidationList[1].stepValidation === true &&
                expressionValidationList[2].stepValidation === true &&
                expressionValidationList[3].stepValidation === true &&
                expressionValidationList[4].stepValidation === true) {
                    formSending(); //initiates the sending procedure if all steps in the form are validates
            }
        }
    })
}

//when the form is complete and verified, the products id and the contact informations are stores in array and object.
formSending = () => {
    const products = [];
    for (let i = 0; i < orders.length; i++) {
        products.push(orders[i].id)
    }
    const contact = {
        "firstName": firstNameValue,
        "lastName": lastNameValue,
        "address": addressValue,
        "city": cityValue,
        "email": emailValue
    }
    postMethod(products, contact);
}

//the post method API connect the site with API and allow to send informations and products of the user in API (and recover the id of order later)
postMethod = (products, contact) => {
    const url = "http://localhost:3000/api/cameras/order";
    const params = {
        "contact": contact,
        "products": products
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onerror = () => {
        console.error("La requête POST en direction de " + url + " a échouée.");
        console.error("Résultat de requête API & Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
    }
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
            localStorage.removeItem('orders'); //deletion of "orders" since it has already been stored in "products" and has been sent to the server
            responseText = xhr.responseText;
            localStorage.setItem("responseTextAPI", responseText); //store the response of the API in localStorage
        }
    }
    xhr.send(JSON.stringify(params)); //stringify the "products" array and contact "object" then send in the API
}

//display error page when nothing in the cart
errorPageEmptyCart = () => {
    document.querySelector(".error-empty").style.display = "block";
    document.querySelector(".cart").style.display = "none";
}

// GENERAL CALLS FUNCTIONS 
const responseTextAPI = localStorage.getItem("responseTextAPI");

if (responseTextAPI != undefined) { //if there is an order waiting to be "accepted", redirect to "orderConfirmation" page
    window.location.replace("orderConfirmation.html");
}
else if (orders == undefined) { //if there is nothing products in the cart, display error page
    errorPageEmptyCart();
}
else { //if there is at least one element in localStorage "orders" array (= minimum one product in cart)
    const submitCartButton = document.querySelector(".cart__contact__form__btn-submit input");

    for (let i = 0; i < orders.length; i++) {
        createElement(
            orders[i].name,
            orders[i].lenses,
            orders[i].price,
            i
        );
        prices.push(orders[i].price) //push prices in "prices" array for calculate them in "totalPrice" function
    }

    totalPrice(prices);
    clearAllProducts();
    submitCartButton.addEventListener('click', event => { //on click "Valider ma commande" button, the functions for the verifications are called
        storeValuesForm();
        formValidation();
    })
}