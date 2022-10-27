const div = (div)=>document.querySelector(div);

div('#menu').addEventListener('touchstart', ()=>{
    div('.side_menu').style.display = 'block';
})
div('.side_menu').addEventListener('touchstart', ()=>{
    div('.side_menu').style.display = 'none';
})