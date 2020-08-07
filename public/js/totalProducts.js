
const ordersLenght = JSON.parse(localStorage.getItem('orders') )
let main = document.querySelector(".header__subtitles__total-orders");
let totalOrders = document.createTextNode(ordersLenght.length);
main.appendChild(totalOrders)