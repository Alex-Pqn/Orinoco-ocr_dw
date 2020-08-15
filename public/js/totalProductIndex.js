
const orders = JSON.parse(localStorage.getItem('orders'))

if (localStorage.length === 0) {
}else{
    if (orders.length !== 0) {
        header = document.querySelector(".header__subtitles__total-orders");
        headerText = document.createTextNode(orders.length);
        header.appendChild(headerText);
    }else {}
}