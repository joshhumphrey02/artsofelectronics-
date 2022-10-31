const diz = (diz)=>document.querySelector(diz);

if(diz('#user').innerHTML == "true"){
    formHandle("log", true, "log_h", true, null);
}

diz('#menu').addEventListener('click', ()=>{
    diz('.side_menu').showModal();
})
diz('body').addEventListener('click', (e)=>{
    if(e.target.classList == "side_menu"){
        diz('.side_menu').close();
    }
})


function Load (){
    fetch('/cart/getCart')
      .then(res => res.json()) 
      .then(data => {
          if(data.length > 0){
            diz('.cart_length').innerHTML = data.length;
          }
      })
}
Load();