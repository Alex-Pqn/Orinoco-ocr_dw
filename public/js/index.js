
// declaration variables
let prdctImageUrl = document.querySelector("article.dyn-products__img");
let prdctTitle = document.getElementById("dyn-products__name");
let prdctDescription = document.getElementById("dyn-products__desc");
let prdctPrice = document.getElementById("dyn-products__price");
let prdctdLenses = document.getElementById("dyn-products__lenses");

// CALL, REQUESTS API - GET
// => http://localhost:3000/api/cameras/

const apiProducts = async function () {
    let xhr = new XMLHttpRequest(); // XHR creation
    xhr.open("GET", "http://localhost:3000/api/cameras/", true); // request preparation
    xhr.responseType = "json"; // request type modify
    xhr.send(); // send request
    console.log(this); //return requests
    xhr.onreadystatechange = function() { // requests checker
        console.log(this);
        if (this.readyState == 4 && this.status == 200 && xhr.DONE) {
            let data = this.response;
            console.log(data)
            for (i = 0; i < data.length; i++) {
                function displayContent () { // function containing my products (for display)
                    const product = function (description, imageUrl, lenses, title, price, id) {
                        this.id = id;
                        this.imageUrl = imageUrl;
                        this.title = title;
                        this.description = description;
                        this.price = price;
                        this.lenses = lenses;
                    }
                    const cameras = new product (
                        data[i]._id,
                        data[i]._imageUrl,
                        data[i]._title,
                        data[i]._description,
                        data[i]._price,
                        data[i]._lenses,
                    )
                    // imageUrl.setAttribute("src", "./public/img/vcam_1.jpg")
                    prdctImageUrl.setAttribute("src", product.imageUrl)
                    prdctTitle.textContent = (product.title);
                    prdctDescription.textContent = (product.description);
                    prdctPrice.textContent = (product.price);
                    prdctdLenses.textContent = (product.lenses);
                }
                displayContent();
            }
    
        } else if (this.status != 200 && this.status != 0) {
            alert("l'API Camera n'a malheureusement pas pu être récupérée...");
            alert("Statut HTTP : " + this.status + ", état readyState : " + this.readyState);
            alert("Veuillez réessayer ultérieurement.")
        }
    };
}
apiProducts();