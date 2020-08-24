
//display error page when nothing in the cart
displayErrorPage = () => {
    document.querySelector(".error-empty").style.display = "block";
    document.querySelector(".cart").style.display = "none";
}

// PRODUCTS LIST PART
// "Récapitulatif de votre commande"

const orders = JSON.parse(localStorage.getItem('orders')) //get "orders" array on localStorage in JSON format
const prices = []; //declare array to store all the prices (in the cart) and make the total price below

//generate html&css and display all products in cart
createElement = (name, lensesChoice, price, index) => {
    //elements creation
    const main = document.querySelector(".cart__smry__products");
    const container = document.createElement("div");
    const nameElement = document.createElement("p");
    const lensesElement = document.createElement("p");
    const priceElement = document.createElement("p");
    const buttonElement = document.createElement("button");
    const nameText = document.createTextNode(name);
    const lensesText = document.createTextNode(lensesChoice);
    const priceText = document.createTextNode(price + " €");
    const crossImg = document.createElement("img");

    //elements attributes
    crossImg.setAttribute('src', "/public/img/crossCart.svg");
    buttonElement.setAttribute('value', index);
    buttonElement.setAttribute('onclick', "clearProductOfChoice(value);");

    //elements classnames
    container.className = "row cart__smry__products__container";
    nameElement.className = "offset-lg-1 col-lg-2 text-left";
    lensesElement.className = "offset-lg-1 col-lg-3 text-left";
    priceElement.className = "offset-lg-1 col-lg-2 text-left";
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
    orders.splice(indexButton, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    location.reload();
}

//display total price of products in cart
totalPrice = () => {
    const main = document.querySelector(".cart__smry__total-price span");
    const reducer = (accumulator, currentValue) => accumulator + currentValue; //declare reducer for calculate the total price (addition)

    const totalPrice = prices.reduce(reducer); //get all the prices in cart (stored in "prices" array) and calculate the total
    const totalPriceText = document.createTextNode(totalPrice); //display the total price

    main.appendChild(totalPriceText);
}

//clear the localStorage when click on the button "Vider le panier (-x)"
clearAllProducts = () => {
    const button = document.querySelector(".cart__smry__clear");

    button.addEventListener('click', event => {
        window.localStorage.clear(); //clear the localStorage
        location.reload(); //reload page to display the change
    })
}

// FORM PART
// "Vos coordonnées"

const submitCartButton = document.querySelector(".cart__contact__form__btn-submit input");

let expressionsList;
let expressionValidationList;

let lastNameValue = document.orderForm.lastName.value;
let nameValue = document.orderForm.Name.value;
let emailValue = document.orderForm.Email.value;
let addressValue = document.orderForm.Address.value;
let postalValue = document.orderForm.Postal.value;
let cityValue = document.orderForm.City.value;

const errorsList = [
    "Cette case ne peut pas contenir de chiffre.",
    "Cette case ne peut pas contenir de caractères spéciaux.",
    "Le code postal doit contenir uniquement des chiffres.",
    "L'e-mail entré est invalide, veillez à bien l'orthographier.",
    "L'adresse entrée est invalide, veillez à bien l'orthographier."
]

//display an error corresponding to the problem in the form
displayErrorForm = (errorValue, index) => {
    const errorForm = expressionValidationList[index].errorForm;
    const displayError = document.querySelector(errorForm);
    displayError.textContent = errorValue;
}

formExpressionValidation = (value) => {
    let expressionValidation = {
        regexContainsNumber : /\d+/, //contains numbers
        regexEmail : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/, //e-mail validation
        regexCaracters : /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/, //specials caracters
        regexAddress : /^[#.0-9a-zA-Z\s,-]+$/, //address validation
        regexOnlyNumbers : /^[0-9]+$/, //only numbers
    }
    expressionsList = {
        regexContainsNumber : expressionValidation.regexContainsNumber.test(value),
        regexEmail : expressionValidation.regexEmail.test(value),
        regexCaracters : expressionValidation.regexCaracters.test(value),
        regexAddress : expressionValidation.regexAddress.test(value),
        regexOnlyNumbers : expressionValidation.regexOnlyNumbers.test(value)
    };
}

storeValuesForm = () => {
    lastNameValue = document.orderForm.lastName.value;
    nameValue = document.orderForm.Name.value;
    emailValue = document.orderForm.Email.value;
    addressValue = document.orderForm.Address.value;
    postalValue = document.orderForm.Postal.value;
    cityValue = document.orderForm.City.value;

    expressionValidationList = [
        {
            value: lastNameValue, errorForm: "#lastName", regexContainsNumber: true, regexCaracters: true, length: 3
        },
        {
            value: nameValue, errorForm: "#Name", regexContainsNumber: true, regexCaracters: true, length: 3
        },
        {
            value: emailValue, errorForm: "#Email", regexEmail: false, length: 4
        },
        {
            value: addressValue, errorForm: "#Address", regexAddress: false, length: 8
        },
        {
            value: postalValue, errorForm: "#Postal", regexOnlyNumbers: false, length: 3
        },
        {
            value: cityValue, errorForm: "#City", regexContainsNumber: true, regexCaracters: true, length: 3
        }
    ]
}

formValidation = () => {
    for (let i = 0; i < expressionValidationList.length; i++) {
        const expression = expressionValidationList[i];
        formExpressionValidation(expression.value)
        if (expression.value.length < expression.length) {
            displayErrorForm("Vous devez entrer au minimum " + expression.length + " caractères.", i);
            event.preventDefault()
        }
        else if (expressionsList.regexContainsNumber === expression.regexContainsNumber) {
            displayErrorForm(errorsList[0], i);
            event.preventDefault()
        }
        else if (expressionsList.regexEmail === expression.regexEmail) {
            displayErrorForm(errorsList[3], i);
            event.preventDefault()
        }
        else if (expressionsList.regexCaracters === expression.regexCaracters) {
            displayErrorForm(errorsList[1], i);
            event.preventDefault()
        }
        else if (expressionsList.regexAddress === expression.regexAddress) {
            displayErrorForm(errorsList[4], i);
            event.preventDefault()
        }
        else if (expressionsList.regexOnlyNumbers === expression.regexOnlyNumbers) {
            displayErrorForm(errorsList[2], i);
            event.preventDefault()
        }
        else {
            displayErrorForm("", i);
        }
    }
    // if (lastnameValidation === true && nameValidation === true && emailValidation === true && addressValidation === true && postalValidation === true && cityValidation === true) {
    //     console.log("Formulaire envoyé !")
    //     formSending(lastNameValue, nameValue, emailValue, addressValue, postalValue, cityValue);
    // } else {
    //     console.error("Impossible d'envoyer le formulaire, l'une des validations est incorrecte")
    // }
}

formSending = (lastNameUser, nameUser, emailUser, addressUser, postalUser, cityUser) => {
    console.log(lastNameUser, nameUser, emailUser, addressUser, postalUser, cityUser)
}

// CALLS FUNCTIONS 
// "form" and "products list" parts

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
    submitCartButton.addEventListener('click', event => {
        storeValuesForm();
        formValidation();
    })
}