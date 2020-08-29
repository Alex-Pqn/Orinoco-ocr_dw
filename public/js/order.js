
let lenses;

//display information of the selected product (according to url parameter/?id=)
pageOrderProduct = (imageUrl, name, description, price) => {
    //elements selectors
    const prdctImageUrl = document.getElementById("order__img");
    const prdctName = document.getElementById("order__name");
    const prdctDescription = document.getElementById("order__desc");
    const prdctPrice = document.getElementById("order__price");
    const prdctButton = document.querySelector(".order button")

    //display informations of product in selectors
    prdctImageUrl.src = imageUrl;
    prdctImageUrl.alt = "Appareil photographique " + name + " du site Orinoco"
    prdctImageUrl.setAttribute("aria-label", "Appareil photographique " + name + " du site Orinoco")
    prdctButton.setAttribute("aria-label", "Ajouter au panier l'appareil " + name)
    prdctName.textContent = '"' + name + '"';
    prdctDescription.textContent = description;
    prdctPrice.textContent = price;
}

//create <option's> in <select> with lenses choices of the product
displayCustomListSelect = (lensesOptions) => {
    lensesOptions.forEach(lensesOptions => { //browse all product choices
        //elements creation & selector
        const custom = document.querySelector(".order__custom__select");
        const option = document.createElement("option");
        //elements attributes
        custom.setAttribute("aria-label", "Liste déroulante pour personnaliser le produit")
        option.className = ".order__custom__select__option";
        option.value = lensesOptions;
        option.textContent = lensesOptions;
        option.setAttribute("aria-label", "Sélectionner la personnalisation " + lensesOptions)
        //parents & childs elements
        custom.appendChild(option);
    });
}

//define the default value of custom product choice and change it when you click on another
customChoiceListener = (defaultLensesChoice) => {
    const select = document.querySelector(".order__custom__select");
    lenses = defaultLensesChoice;

    select.addEventListener('change', event => {
        lenses = event.target.value;
    });
};

//store "name", "lenses" choice and "price" in localStorage "orders" array (on "Ajouter à mon panier" button click)
finalisationButton = (name, price, id) => {
    const orders = JSON.parse(localStorage.orders || '[]');
    const button = document.querySelector(".order button");

    //listen the "Ajouter à mon panier" button
    button.addEventListener('click', event => {
        const productOrder = {
            name: name,
            lenses: lenses,
            price: price,
            id: id
        };
        orders.push(productOrder); //push productOrder object in "orders" array
        localStorage.setItem("orders", JSON.stringify(orders)); //set the "orders" array in localStorage (strings format)
        window.location.replace("../../index.html")
    })
}

// CALL, REQUESTS API - GET
// => http://localhost:3000/api/cameras/

const apiProducts = async function () {
    const url = "http://localhost:3000/api/cameras/";
    let xhr = new XMLHttpRequest(); //XHR http request creation
    xhr.open("GET", url, true); //request method & url
    xhr.responseType = "json"; //request format modify
    xhr.send(); //send request
    xhr.onerror = () => {
        displayErrorPage();
        console.error("La requête GET en direction de " + url + " a échouée.");
        console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
    };
    xhr.onreadystatechange = function() {
        const apiStatusReady = this.readyState === 4 && this.status === 200 && xhr.DONE; //status when API is ready
        const apiStatusNotReady = this.status !== 200 && this.status !== 0; //status when API is not ready

        if (apiStatusReady) { //if API is ready
            const cameras = this.response; //store API content in "cameras" const

            try { //recover url "?id=" parameter and store in const "id"
                let url_string = (window.location.href).toLowerCase();
                let url = new URL(url_string);
                let foundUrl = false;
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
                        displayCustomListSelect(
                            cameras[i].lenses,
                        )
                        customChoiceListener(
                            cameras[i].lenses[0]
                        );
                        finalisationButton(
                            cameras[i].name,
                            cameras[i].price,
                            cameras[i]._id
                        );
                    }
                }
                if (!foundUrl) { //if no API id matched with the id in the url parameter, redirect to home
                    window.location.replace("../../index.html");
                }
            } catch (err) { //if the url parameter can't be create, redirect to home
                console.error("Erreur rencontrée lors de la création du paramètre d'url : " + err);
                window.location.replace("../../index.html");
            }

        } else if (apiStatusNotReady) { //if API is not ready, return errors + status readyState & http in console
            displayErrorPage();
            console.error("La requête GET en direction de " + url + " a échouée.");
            console.error("Résultat de requête API / Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
        };
    };
}
apiProducts()

//display error page when API not respond
displayErrorPage = () => {
    document.querySelector(".order").style.display = "none";
    document.querySelector(".error-api").style.display = "block";
}