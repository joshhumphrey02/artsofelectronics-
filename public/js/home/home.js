const cart_value = document.querySelector('.cart_length');

document.querySelector('body').addEventListener('load', ()=>{
  console.log('onload')
    document.querySelector('.loader').showModal();
})
document.querySelector('body').addEventListener('unload', ()=>{
  console.log('unload')
    document.querySelector('.loader').close();
})

// function Loaded (){
//     fetch('/getCart')
//       .then(res => res.json()) 
//       .then(data => {
//           if(data.length > 0){
//             cart_value.innerHTML = data.length;
//           }
//       })
// }
// Loaded();

