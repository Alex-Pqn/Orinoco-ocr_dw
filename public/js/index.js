

// CALL, REQUESTS API - GET
// => http://localhost:3000/api/cameras/

const apiProducts = async function () {
    let xhr = new XMLHttpRequest(); // XHR creation
    xhr.open("GET", "http://localhost:3000/api/cameras/", true); // request preparation
    xhr.responseType = "json"; // request type modify
    xhr.send(); // send request
    console.log(this); //return requests
    xhr.onerror;
    xhr.onreadystatechange = function() {
        console.log(this);
        if (this.readyState === 4 && this.status === 200 && xhr.DONE) {
            let data = this.response;
            const cameras = data;

            for (i = 0; i < cameras.length; i++) {
                idContent = cameras[i]._id;
                imageUrlContent = cameras[i].imageUrl;
                nameContent = cameras[i].name;
                descriptionContent = cameras[i].description;
                lensesContent = cameras[i].lenses;
                pricesContent = cameras[i].price;
                createArticle()
            }

        } else if (this.status !== 200 && this.status !== 0) {
            alert("l'API 'Camera products' n'a malheureusement pas pu être récupérée... Veuillez réessayer ultérieurement.");
            console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
        };
    };
}
apiProducts();

function createArticle() {
    //Elements creation
    let main = document.querySelector(".products__list")
    let article = document.createElement("article");
    let imageUrl = document.createElement("img");
    let name = document.createElement("h5");
    let description = document.createElement("p");
    let lenses = document.createElement("p");
    let price = document.createElement("p");
    let buttonHref = document.createElement("a");
    let button = document.createElement("button");
    //Elements content
    imageUrl.src = imageUrlContent;
    let nameText = document.createTextNode(nameContent)
    let descriptionText = document.createTextNode(descriptionContent)
    let lensesText = document.createTextNode("Types de lentilles disponibles : " + lensesContent)
    let priceText = document.createTextNode("Prix : " + pricesContent + " €")
    let buttonText = document.createTextNode("Commander");
    buttonHref.href = "product.html?id="+idContent;
    //Classnames creation
    description.className = "products__list__desc"
    lenses.className = "products__list__lenses"
    price.className = "products__list__price"
    //Parents, childs
    name.appendChild(nameText);
    description.appendChild(descriptionText);
    price.appendChild(priceText);
    lenses.appendChild(lensesText);
    buttonHref.appendChild(button);
    button.appendChild(buttonText);
    main.appendChild(article);
    article.appendChild(name);
    article.appendChild(imageUrl);
    article.appendChild(description);
    article.appendChild(lenses);
    article.appendChild(price);
    article.appendChild(buttonHref);
}