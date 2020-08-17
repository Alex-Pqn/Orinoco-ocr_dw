
const url = "http://localhost:3000/api/cmeras/"

createArticle = (id, imageUrl, name, description, lenses, price) => {
    //elements creation
    const main = document.querySelector(".products__list");
    const article = document.createElement("article");
    const imageUrlElement = document.createElement("img");
    const nameElement = document.createElement("h5");
    const descriptionElement = document.createElement("p");
    const lensesElement = document.createElement("p");
    const priceElement = document.createElement("p");
    const buttonElement = document.createElement("button");
    const buttonHrefElement = document.createElement("a");

    //elements attributes
    const nameText = document.createTextNode(name);
    const descriptionText = document.createTextNode(description);
    const lensesText = document.createTextNode("Types de lentilles disponibles : " + lenses.join(", "));
    const priceText = document.createTextNode("Prix : " + price + " €");
    const buttonText = document.createTextNode("Commander");
    buttonHrefElement.href = "/public/html/order.html?id="+id;
    imageUrlElement.src = imageUrl;

    //elements classnames
    article.className = "col-lg-6";
    descriptionElement.className = "products__list__desc";
    lensesElement.className = "products__list__lenses";
    priceElement.className = "products__list__price";
    
    //parents & childs elements
    main.appendChild(article);
    article.appendChild(nameElement);
    article.appendChild(imageUrlElement);
    article.appendChild(descriptionElement);
    article.appendChild(lensesElement);
    article.appendChild(priceElement);
    article.appendChild(buttonHrefElement);
    nameElement.appendChild(nameText);
    descriptionElement.appendChild(descriptionText);
    priceElement.appendChild(priceText);
    lensesElement.appendChild(lensesText);
    buttonHrefElement.appendChild(buttonElement);
    buttonElement.appendChild(buttonText);
}

//display error page when nothing in the cart
displayErrorPage = () => {
    document.querySelector(".error-api").style.display = "block";
    document.querySelector(".products").style.display = "none";
}

// CALL, REQUESTS API - GET
// => http://localhost:3000/api/cameras/

const apiProducts = async function () {
    let xhr = new XMLHttpRequest(); //XHR http request creation
    xhr.open("GET", url, true); //request method & url
    xhr.responseType = "json"; //request format modify
    xhr.send(); //send request
    console.log(this); //display request in console
    xhr.onerror;
    xhr.onreadystatechange = function() {
        const apiStatusReady = this.readyState === 4 && this.status === 200 && xhr.DONE; //status when API is ready
        const apiStatusNotReady = this.status !== 200 && this.status !== 0; //status when API is not ready
        console.log(this); //display http requests in console
        
        if (apiStatusReady) { //if API is ready
            const cameras = this.response; //store API content in "cameras" const

            for (let i = 0; i < cameras.length; i++) {
                createArticle( //store the API content in a function called below
                    cameras[i]._id,
                    cameras[i].imageUrl,
                    cameras[i].name,
                    cameras[i].description,
                    cameras[i].lenses,
                    cameras[i].price
                )
            }

        } else if (apiStatusNotReady) { //if API is not ready, return errors + status readyState & http in console
            displayErrorPage();
            console.error("l'API 'Camera products' n'a pas pu être récuperée.");
            console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
        };
    };
}
apiProducts();