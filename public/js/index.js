
// let demo = document.getElementById("demo");
let xhr = new XMLHttpRequest(); //Creation HML HTTP REQUEST

xhr.onreadystatechange = function() {
    console.log(this);
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response) //return content file text.txt

    } else if (this.status != 200 && this.status != 0) {
        alert("Malheureuseument, l'API Camera n'a pas pu être récupérée...");
        alert("Statut HTTP : " + this.status);
    }
};

xhr.open("GET", "http://127.0.0.1:5500/models/Camera.js", true); //preparation request
xhr.responseType = "object"; //modify type request in text
xhr.send(); //send request

