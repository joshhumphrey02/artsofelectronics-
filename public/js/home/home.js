const cart_value = document.querySelector('.cart_length');


function Loaded (){
    fetch('/getCart')
      .then(res => res.json()) 
      .then(data => {
          if(data.length > 0){
            cart_value.innerHTML = data.length;
          }
      })
}
Loaded();

