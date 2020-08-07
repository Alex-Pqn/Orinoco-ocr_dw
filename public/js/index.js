
const url = "http://localhost:3000/api/cameras/"

// CALL, REQUESTS API - GET
// => http://localhost:3000/api/cameras/

const apiProducts = async function () {
    let xhr = new XMLHttpRequest(); // XHR creation
    xhr.open("GET", url, true); // request method & url
    xhr.responseType = "json"; // request type modify
    xhr.send(); // send request
    console.log(this);
    xhr.onerror;
    xhr.onreadystatechange = function() {
        const apiStatutReady = this.readyState === 4 && this.status === 200 && xhr.DONE; // status when API is ready
        const apiStatutNotReady = this.status !== 200 && this.status !== 0; // statut when API is not ready
        console.log(this); // return http requests in console
        
        if (apiStatutReady) { // if API is ready
            const cameras = this.response; // store API content in "cameras" const

            for (let i = 0; i < cameras.length; i++) {
                createArticle( // store the API content in a function called below
                    cameras[i]._id,
                    cameras[i].imageUrl,
                    cameras[i].name,
                    cameras[i].description,
                    cameras[i].lenses,
                    cameras[i].price
                )
            }

        } else if (apiStatutNotReady) { // if API is not ready
            alert("l'API 'Camera products' n'a malheureusement pas pu être récupérée... Veuillez réessayer ultérieurement.");
            console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState); // return errors + statuts readyState & http in console
        };
    };
}
apiProducts();

function createArticle(idContent, imageUrlContent, nameContent, descriptionContent, lensesContent, priceContent) {
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
    let lensesText = document.createTextNode("Types de lentilles disponibles : " + lensesContent.join(", "))
    let priceText = document.createTextNode("Prix : " + priceContent + " €")
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