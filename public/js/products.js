

const url = "http://localhost:3000/api/cameras/"

let orders = JSON.parse(localStorage.orders || '[]');

let foundUrl = false;
let lensesChoice;

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

            try { // recover url "?id=" parameter and store in const "id"
                let url_string = (window.location.href).toLowerCase();
                let url = new URL(url_string);
                const id = url.searchParams.get("id");

                for (let i = 0; i < cameras.length; i++) {
                    if (id === cameras[i]._id) { // if an id in the API is matched with the id in the url parameter
                        foundUrl = true;

                        pageOrderProduct(
                            cameras[i].imageUrl,
                            cameras[i].name,
                            cameras[i].description,
                            cameras[i].price
                        );
                        customListSelect(
                            cameras[i].lenses
                        );
                        customChoice(
                            cameras[i].lenses[0]
                        );
                        buttonFinalisation(
                            cameras[i].name,
                            cameras[i].price
                        );
                    }
                }
                if (!foundUrl) { // if no API id matched with the id in the url parameter
                    window.location.replace("index.html"); // redirect to home
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

// Display informations of product according to url parameter
function pageOrderProduct(imageUrl, name, description, price) {

    // Call id's in "product" page
    let prdctImageUrl = document.getElementById("products-order__img");
    let prdctName = document.getElementById("products-order__name");
    let prdctDescription = document.getElementById("products-order__desc");
    let prdctPrice = document.getElementById("products-order__price");

    // Completion of content
    prdctImageUrl.src = imageUrl;
    prdctName.textContent = '"' + name + '"';
    prdctDescription.textContent = description;
    prdctPrice.textContent = price;
}

// Create <option> in <select> with lenses choices of product
function customListSelect(lenses) {
    lenses.forEach(lensesContent => {
        let option = document.createElement("option");
        option.className = ".products-order__custom__select__option";
        option.value = lensesContent
        option.textContent = lensesContent;

        let custom = document.querySelector(".products-order__custom__select");
        custom.appendChild(option);
    });
}

// Define the default value of custom product choice and change it when you click on another
function customChoice(defaultCustomChoice) {
    let select = document.querySelector(".products-order__custom__select");;
    lensesChoice = defaultCustomChoice;

    select.addEventListener('change', event => {
        lensesChoice = event.target.value;
    })
}

// Store name, price and lensesChoice in localStorage on button (Ajouter à mon panier) click
function buttonFinalisation(name, price) {
    const button = document.querySelector("button");

    button.addEventListener('click', event => {

        const orderProduct = {
            nameProduct: name,
            customChoiceProduct: lensesChoice,
            priceProduct: price
        }
        orders.push(orderProduct)
        localStorage.setItem("orders", JSON.stringify(orders))
        window.location.replace("index.html");
    })
}