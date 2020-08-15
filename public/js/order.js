
const url = "http://localhost:3000/api/cameras/"
const orders = JSON.parse(localStorage.orders || '[]');
let foundUrl = false;
let lensesChoice;

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
        const apiStatutReady = this.readyState === 4 && this.status === 200 && xhr.DONE; //status when API is ready
        const apiStatutNotReady = this.status !== 200 && this.status !== 0; //statut when API is not ready
        console.log(this); //return http requests in console

        if (apiStatutReady) { //if API is ready
            const cameras = this.response; //store API content in "cameras" const

            try { //recover url "?id=" parameter and store in const "id"
                let url_string = (window.location.href).toLowerCase();
                let url = new URL(url_string);
                const id = url.searchParams.get("id");

                for (let i = 0; i < cameras.length; i++) {
                    if (id === cameras[i]._id) { //if an id in the API is matched with the id in the url parameter
                        foundUrl = true;
                        pageOrderProduct(
                            cameras[i].imageUrl,
                            cameras[i].name,
                            cameras[i].description,
                            cameras[i].lenses,
                            cameras[i].price
                        );
                        customChoiceEventListener(
                            cameras[i].lenses[0]
                        );
                        finalisationButton(
                            cameras[i].name,
                            cameras[i].price
                        );
                    }
                }
                if (!foundUrl) { //if no API id matched with the id in the url parameter, redirect to home
                    window.location.replace("../../index.html");
                }
            } catch (err) { //if the url parameter can't be create, redirect to home when user click "OK"
                console.error("Erreur rencontrée lors de la création du paramètre d'url : " + err);
                window.location.replace("../../index.html");
            }

        } else if (apiStatutNotReady) { //if API is not ready, return errors + statuts readyState & http in console
            alert("l'API 'Camera products' n'a malheureusement pas pu être récupérée... Veuillez réessayer ultérieurement.");
            console.error("l'API 'Camera products' n'a pas pu être récuperée.")
            console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
        };
    };
}
apiProducts();

//display information of the selected product (according to url parameter/?id=)
function pageOrderProduct(imageUrl, name, description, lenses, price) {
    displayCustomListSelect(
        lenses
    );
    //elements selectors in "order" page
    const prdctImageUrl = document.getElementById("products-order__img");
    const prdctName = document.getElementById("products-order__name");
    const prdctDescription = document.getElementById("products-order__desc");
    const prdctPrice = document.getElementById("products-order__price");

    //display informations of product in elements called above
    prdctImageUrl.src = imageUrl;
    prdctName.textContent = '"' + name + '"';
    prdctDescription.textContent = description;
    prdctPrice.textContent = price;
}

//create <option's> in <select> with lenses choices of product
function displayCustomListSelect(lenses) {
    lenses.forEach(lenses => {
        //elements creation & selector
        const custom = document.querySelector(".products-order__custom__select");
        const option = document.createElement("option");
        //elements attributes
        option.className = ".products-order__custom__select__option";
        option.value = lenses;
        option.textContent = lenses;
        //parents & childs elements
        custom.appendChild(option);
    });
}

//define the default value of custom product choice and change it when you click on another
function customChoiceEventListener(defaultLensesChoice) {
    const select = document.querySelector(".products-order__custom__select");
    lensesChoice = defaultLensesChoice;

    //listen the selected custom choice
    select.addEventListener('change', event => {
        lensesChoice = event.target.value;
    });
};

//store "name", "lensesChoice" and "price" in localStorage "orders" array on button click
function finalisationButton(name, price) {
    const button = document.querySelector(".products-order button");

    //listen the "Ajouter à mon panier" button
    button.addEventListener('click', event => {
        const productOrder = {
            nameProduct: name,
            lensesChoiceProduct: lensesChoice,
            priceProduct: price
        };
        orders.push(productOrder); //push productOrder object in "orders" array
        localStorage.setItem("orders", JSON.stringify(orders)); //set the "orders" array in localStorage (in strings format)
        window.location.replace("../../index.html"); //redirect to home
    })
}