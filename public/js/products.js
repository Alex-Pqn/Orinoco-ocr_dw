
let prdctImageUrl = document.getElementById("products-order__img");
let prdctName = document.getElementById("products-order__name");
let prdctDescription = document.getElementById("products-order__desc");
let prdctPrice = document.getElementById("products-order__price");
let prdctdCustom = document.getElementById("products-order__custom");

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

            try {
                var url_string = (window.location.href).toLowerCase();
                var url = new URL(url_string);
                var id = url.searchParams.get("id");

                for (i = 0; i < cameras.length; i++) {

                    if (id == cameras[i]._id) {
                        prdctImageUrl.src = cameras[i].imageUrl;
                        prdctName.textContent = ('"'+cameras[i].name+'"');
                        prdctDescription.textContent = (cameras[i].description);
                        lensesContent = (cameras[i].lenses);
                        prdctPrice.textContent = (cameras[i].price);
                    }

                    // else if (id !== cameras[i]._id && (i.length === cameras.length || i.length > cameras.length)) {
                    //     console.error("Page inexistante, l'url spécifiée ne correspond à aucun de nos produits")
                    //     pageNotFound();
                    // }

                }

            } catch (err) {
                console.error("Erreur rencontrée lors de la création du paramètre d'url : " + err);
            }

        } else if (this.status !== 200 && this.status !== 0) {
            alert("l'API 'Camera products' n'a malheureusement pas pu être récupérée... Veuillez réessayer ultérieurement.");
            console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
        };
    };
}
apiProducts();

// function customList() {
//     let custom = document.querySelector(".custom")
//     let option = document.createElement("option");
//     option.id = "products-order__custom"
//     option.textContent = lensesContent
//     custom.appendChild(option);
// }

// function pageNotFound() {
//     let error = document.querySelector("article");
//     error.className = "pagenotfound";
// }