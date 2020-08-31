
const ordersLocalStorage = JSON.parse(localStorage.getItem('orders'));

dislayLengthCartIcon = () => {
    header = document.querySelector("#total-orders");
    headerText = document.createTextNode(ordersLocalStorage.length);
    header.appendChild(headerText);
}

if (ordersLocalStorage != undefined) {
    dislayLengthCartIcon();
}