const formInvalidLastName = "Le nom est invalide."
const formInvalidName = "Le prénom est invalide."
const formInvalidEmail = "L'e-mail entrée est invalide."
const formInvalidAddress = "L'adresse entréee est invalide."
const formInvalidPostal = "Le code postal entré est invalide."
const formInvalidCity = "Le nom de ville entré est invalide."
const formContainsNumber = "Cette case ne peut pas contenir de chiffre."
const formContainsCaracters = "Cette case ne peut pas contenir de caractères spéciaux."
const formEnoughCaractersThree = "Cette case doit contenir plus de 3 caractères."
const formEnoughCaractersFourth = "Cette case doit contenir plus de 4 caractères."
const formEnoughCaractersEight = "Cette doit contenir plus de 8 caractères."
const formContainsOnlyNumbers = "Cette case ne peut pas contenir uniquement des chiffres."
const formContainsOnlyLetters = "Cette case ne peut pas contenir uniquement des lettres."
const formMustContainsOnlyNumbers = "Cette case doit contenir uniquement des chiffres."
const empty = ""
let expressionsList;
let lastnameValidation;
let nameValidation;
let emailValidation;
let addressValidation;
let postalValidation;
let cityValidation;
let lastNameValue;
let nameValue;
let emailValue;
let addressValue;
let postalValue;
let cityValue;
let errorForm;

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

function formExpressionValidation(value) {
    let expressionValidation = {
        containsNumber : /\d+/, //contains numbers
        containsLetter : /[a-zA-Z]/, //contains letters
        regexEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, //e-mail validation
        regexCaracters : /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/, //specials caracters
        regexAddress : /^[#.0-9a-zA-Z\s,-]+$/, //address validation
        onlyLetters : /^[A-Za-z]+$/, //only letters
        onlyNumbers : /^[0-9]+$/, //only numbers
    }
    expressionsList = {};
    expressionsList.containsNumber = expressionValidation.containsNumber.test(value);
    expressionsList.containsLetter = expressionValidation.containsLetter.test(value);
    expressionsList.regexEmail = expressionValidation.regexEmail.test(value);
    expressionsList.regexCaracters = expressionValidation.regexCaracters.test(value);
    expressionsList.onlyNumbers = expressionValidation.onlyNumbers.test(value);
    expressionsList.onlyLetters = expressionValidation.onlyLetters.test(value);
    return expressionsList;
}

formValidation = () => {
    const submitButton = document.querySelector(".cart__contact__form__btn-submit input");
    submitButton.addEventListener('click', event => {
        cityFormValidation();
        postalFormValidation();
        addressFormValidation();
        emailFormValidation();
        nameFormValidation();
        lastnameFormValidation();

        if (lastnameValidation === true && nameValidation === true && emailValidation === true && addressValidation === true && postalValidation === true && cityValidation === true) {
            console.log("Formulaire envoyé !")
            formSending(lastNameValue, nameValue, emailValue, addressValue, postalValue, cityValue);
        } else {
            console.error("Impossible d'envoyer le formulaire, l'une des validations est incorrecte")
        }
    })
}

lastnameFormValidation = () => {
    lastNameValue = document.orderForm.lastName.value
    formExpressionValidation(lastNameValue)

    if (expressionsList.containsNumber === true) {
        displayErrorForm(formInvalidLastName, formContainsNumber);
    }
    if (expressionsList.regexCaracters === true) {
        displayErrorForm(formInvalidLastName, formContainsCaracters);
    } 
    if (lastNameValue.length < 3) {
        displayErrorForm(formInvalidLastName, formEnoughCaractersThree);
    } else {
        displayErrorForm(empty, empty)
        lastnameValidation = true;
    }
}
nameFormValidation = () => {
    nameValue = document.orderForm.Name.value
    formExpressionValidation(nameValue)

    if (expressionsList.containsNumber === true) {
        displayErrorForm(formInvalidName, formContainsNumber);
    } 
    if (expressionsList.regexCaracters === true) {
        displayErrorForm(formInvalidName, formContainsCaracters);
    } 
    if (nameValue.length < 3) {
        displayErrorForm(formInvalidName, formEnoughCaractersThree);
    } else {
        displayErrorForm(empty, empty)
        nameValidation = true;
    }
}
emailFormValidation = () => {
    emailValue = document.orderForm.Email.value
    formExpressionValidation(emailValue)

    if (expressionsList.regexEmail === false) {
        displayErrorForm(formInvalidEmail, formContainsCaracters);
    } 
    if (expressionsList.onlyLetters === true) {
        displayErrorForm(formInvalidEmail, formContainsOnlyLetters);
    } 
    if (expressionsList.onlyNumbers === true) {
        displayErrorForm(formInvalidEmail, formContainsOnlyNumbers);
    } 
    if (emailValue.length < 4) {
        displayErrorForm(formInvalidEmail, formEnoughCaractersFourth);
    } else {
        displayErrorForm(empty, empty)
        emailValidation = true;
    }
}
addressFormValidation = () => {
    addressValue = document.orderForm.Address.value
    formExpressionValidation(addressValue)

    if (expressionsList.regexAddress === false) {
        displayErrorForm(formInvalidAddress, formContainsCaracters)
    } else if (expressionsList.onlyNumbers === true) {
        displayErrorForm(formInvalidAddress, formContainsOnlyNumbers)
    } else if (addressValue.length < 8) {
        displayErrorForm(formInvalidAddress, formEnoughCaractersEight)
    } else {
        displayErrorForm(empty, empty)
        addressValidation = true;
    }
}
postalFormValidation = () => {
    postalValue = document.orderForm.Postal.value
    formExpressionValidation(postalValue)

    if (expressionsList.onlyNumbers === false) {
        displayErrorForm(formInvalidPostal, formMustContainsOnlyNumbers)
    } else if (postalValue.length < 3) {
        displayErrorForm(formInvalidPostal, formEnoughCaractersThree)
    } else {
        displayErrorForm(empty, empty)
        postalValidation = true;
    }
}
cityFormValidation = () => {
    cityValue = document.orderForm.City.value
    formExpressionValidation(cityValue)

    if (expressionsList.containsNumber === true) {
        displayErrorForm(formInvalidCity, formContainsNumber)
    } else if (expressionsList.regexCaracters === true) {
        displayErrorForm(formInvalidCity, formContainsCaracters)
    } else if (cityValue.length < 3) {
        displayErrorForm(formInvalidCity, formEnoughCaractersThree)
    } else {
        displayErrorForm(empty, empty)
        cityValidation = true;
    }
}

formSending = (lastNameUser, nameUser, emailUser, addressUser, postalUser, cityUser) => {
    console.log(lastNameUser, nameUser, emailUser, addressUser, postalUser, cityUser)
}

//display an error corresponding to the problem in the form
displayErrorForm = (firstErrorValue, secondErrorValue) => {
    const errorContainer = document.querySelector(".cart__contact__form__error strong");
    errorContainer.textContent = firstErrorValue + " " + secondErrorValue
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
    formValidation();
}