const div = div=> document.querySelector(div);
const divs = divs=> document.querySelectorAll(divs);
const Loaded = async ()=>{
    userAddress();
    let res = await fetch(`/getCart`);
    let data = await res.json();
    if(data){
      div(".cart_length").innerHTML = data.length;
      let check = data.some(item=> item.checked);
      let fee = check ? Number(div(".fee").innerHTML) : 0;
      let sum = data.reduce((sum, value)=> value.checked ? (sum + (value.price * value.product_qty)) : 0, 0);
      divs(".cartSub").forEach(item=> item.innerHTML = sum);
      divs(".total").forEach(item=> item.innerHTML = sum + fee);
      divs('.product').forEach((product) => {
          const elem = tag=> product.querySelector(tag)
          elem('#decrease').classList.add("noCurs") 
          elem('#increase').classList.add("noCurs");
          elem('#checkbox').classList.add('afterCheck'); elem('#checkbox').classList.add('noCurs');
      });
    }
}
div("#add_address").addEventListener("click", () => {
  div(".address").showModal();
  userAddress();
});
div("#close").addEventListener("click", () => div(".address").close());
div("#cancel").addEventListener("click", () => div(".address").close());
divs('.form_control').forEach(control=>{
    control.addEventListener('mouseenter', ()=>{
       control.style.borderColor = 'blue';
    })
    control.addEventListener('mouseleave', ()=>{
       control.style.borderColor = 'initial';
    })
})
divs('.valid').forEach(valid=>{
    const input = valid.querySelector('input');
    const error = valid.querySelector('p');
    input.addEventListener('keyup', ()=>{
        if(input.value.length == 0){
            error.style.color = 'red';
        }
        else{
            div('.msg').classList.remove('msgAfter');
            error.style.color = 'initial';
        }
    })
})
div("#comfirm").addEventListener('click', async()=>{
    if(phone.value.length == 0){
        div('.warning').classList.add('warningAfter');
        div('.warning').textContent = 'Please enter valid details';
        return setTimeout(()=>div('.warning').classList.remove('warningAfter'), 3000);
    }
    else{
        let res = await fetch('/postAddress',{
            method: "POST",
            headers: {"content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({
                phone: div("#phone").value,
                street: div("#street").value,
                country: div("#country").value,
                state: div("#state").value,
                lga: div("#lga").value,
                apartment: div("#apartment").value
            })
        })
        let data = await res.json();
        if(data.added){ 
            div(".address").close();
            div('.msg').textContent = 'Address Added';
            div('.msg').classList.add('msgAfter');
            userAddress();
        }
    }
})
const userAddress = async()=>{
    let res = await fetch('/getAddress');
    let data = await res.json();
    if(data.length != 0){
        div('.butt').textContent = 'Change Address';
        div("#phone").value = div('#Phone').textContent = data[0].phone;
        div("#street").value = div('#Street').textContent = data[0].street;
        div('#Lga').textContent = `${data[0].lga}, `;
        div('#State').textContent =` ${data[0].state}, `;
        div('#Country').textContent = data[0].country;
        div("#apartment").value = div('#Apartment').textContent = data[0].apartment;
    }
    else{ div('.butt').textContent = 'Add Address'}
}
// div('#card_meth').addEventListener('click', ()=>{
//     div('.cardModal').showModal();
//     cardDetails();
// })
// div('#cardClose').addEventListener('click', ()=>div('.cardModal').close());

const pay_area = async()=>{
    try {
        let rez = await fetch('/cart/pay');
        let daz = await rez.json();
        div('.loader').close();
        return location.href = (daz.url);
    } catch (error) {
        div('.loader').close();
        div('.msg').textContent = 'Please Check your internet connection';
        div('.msg').classList.add('msgAfter');
    }
}

div('#paynow').addEventListener("click", async()=>{
    div('.loader').showModal();
    let res = await fetch('/getAddress');
    let data = await res.json();
    if(data.length > 0){
        pay_area();
    }
    else{
        div('.msg').textContent = 'Please add a shipping address';
        div('.msg').classList.add('msgAfter');
    }
});
divs('.item_link').forEach(item=>{
    item.addEventListener('click', (e)=>{
        e.preventDefault();
    })
})

window.addEventListener('unonload', ()=>{
    div('.loader').close();
})
Loaded();