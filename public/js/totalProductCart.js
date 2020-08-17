
if (localStorage.length === 0) {
}else{
    if (orders.length !== 0) {
        header = document.querySelector(".header__subtitles__total-orders");
        headerText = document.createTextNode(orders.length);
        header.appendChild(headerText);
        clearButton = document.querySelector(".cart__smry__clear span");
        clearButtonText = document.createTextNode(orders.length);
        clearButton.appendChild(clearButtonText);
    }else {}
}