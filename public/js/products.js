
let foundUrl = false;

// CALL, REQUESTS API - GET
// => http://localhost:3000/api/cameras/

const apiProducts = async function () {
    let xhr = new XMLHttpRequest(); // XHR creation
    xhr.open("GET", "http://localhost:3000/api/cameras/", true); // request method & url
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

            console.log(cameras)

            try { // recover url "?id=" parameter and store in const "id"
                let url_string = (window.location.href).toLowerCase();
                let url = new URL(url_string);
                const id = url.searchParams.get("id");

                for (i = 0; i < cameras.length; i++) {
                    if (id === cameras[i]._id) { // if an id in the API is matched with the id in the url parameter
                        foundUrl = true;
                        orderProduct( // store the API content in a function called below
                            cameras[i].imageUrl,
                            cameras[i].name,
                            cameras[i].description,
                            cameras[i].price
                        )
                        customList(
                            cameras[i].lenses
                        )
                    }
                }
                if (!foundUrl) { // if no API id matched with the id in the url parameter
                    window.location.href ="index.html"; // redirect to home
                }

            } catch (err) { // if the url parameter can't be create
                console.error("Erreur rencontrée lors de la création du paramètre d'url : " + err);
                window.location.replace("index.html"); // redirect to home when user click "OK"
            }

        } else if (apiStatutNotReady) { // if API is not ready
            alert("l'API 'Camera products' n'a malheureusement pas pu être récupérée... Veuillez réessayer ultérieurement.");
            console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState); // return errors + statuts readyState & http in console
        };
    };
}
apiProducts();

function customList(lenses) {
    for (i = 0; i < lenses.length; i++) {
        console.log(lenses[i])
        let custom = document.querySelector(".custom")
        let option = document.createElement("option");
        option.id = "products-order__custom"
        option.textContent = lenses[i];
        custom.appendChild(option);
    }
}

function orderProduct (imageUrl, name, description, price) {
    //Call id's in "product" page
    let prdctImageUrl = document.getElementById("products-order__img");
    let prdctName = document.getElementById("products-order__name");
    let prdctDescription = document.getElementById("products-order__desc");
    let prdctPrice = document.getElementById("products-order__price");
    // let prdctCustom = document.getElementById("products-order__custom");
    //Display the content according to url parameter
    prdctImageUrl.src = imageUrl;
    prdctName.textContent = '"' + name + '"';
    prdctDescription.textContent = description;
    prdctPrice.textContent = price;
}