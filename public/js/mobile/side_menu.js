const div = (div)=>document.querySelector(div);

div('#menu').addEventListener('click', ()=>{
    div('.side_menu').showModal();
})
div('body').addEventListener('click', (e)=>{
    if(e.target.classList == "side_menu"){
        div('.side_menu').close();
    }
})


function Load (){
    fetch('/getCart')
      .then(res => res.json()) 
      .then(data => {
          if(data.length > 0){
            div('.cart_length').innerHTML = data.length;
          }
      })
}
Load();