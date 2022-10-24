(function Loaded() {
  let cartItems = document.querySelector(".cart_length");
  fetch("/getCart")
    .then((res) => res.json())
    .then((data) => {
      cartItems.innerHTML = data.length;
    });
})()