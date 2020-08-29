
const ordersLength = JSON.parse(localStorage.getItem('orders'));

dislayLengthCartIcon = () => {
    header = document.querySelector(".header__subtitles__total-orders");
    headerText = document.createTextNode(ordersLength.length);
    header.appendChild(headerText);
}

if (ordersLength != undefined) {
    dislayLengthCartIcon();
}