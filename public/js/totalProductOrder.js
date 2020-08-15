
if (orders.length !== 0) {
    header = document.querySelector(".header__subtitles__total-orders");
    headerText = document.createTextNode(orders.length);
    header.appendChild(headerText);
}else {}