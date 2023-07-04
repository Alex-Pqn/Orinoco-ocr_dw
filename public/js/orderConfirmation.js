const responseTextAPI = JSON.parse(localStorage.getItem('responseTextAPI'));
const totalPrice = localStorage.getItem('totalPrice');

if (responseTextAPI == undefined) {
  //if there is no order pending acceptance
  window.location.replace('../../index.html');
} else {
  const orderId = responseTextAPI.orderId;
  const contact = responseTextAPI.contact;

  //acceptation button to accept to have noted the identifier of the order ("J'accepte avoir noté mon identifiant de commande" button)
  acceptationButton = () => {
    const button = document.querySelector('.orderConfirmation button');
    button.addEventListener('click', (event) => {
      localStorage.removeItem('responseTextAPI');
      localStorage.removeItem('totalPrice');
      window.location.replace('../../index.html');
    });
  };

  //create html&css to display firstName, lastName, final orderID and totalPrice in "orderConfirmation" page
  createElement = () => {
    //elements selectors
    const firstNameElement = document.querySelector('#firstName');
    const lastNameElement = document.querySelector('#lastName');
    const orderIdElement = document.querySelector('#orderID');
    const totalPriceElement = document.querySelector('#totalPrice');

    //elements attributes
    firstNameElement.textContent = contact.firstName;
    lastNameElement.textContent = contact.lastName;
    orderIdElement.textContent = orderId;
    totalPriceElement.textContent = totalPrice;
  };
  createElement();
  acceptationButton();
}
