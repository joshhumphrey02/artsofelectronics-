const productModal = document.querySelector(".product_modal");
const cartBtn = document.querySelector("#card_cart");
const modalInfo = document.querySelector(".modal_info");
const productQty = document.querySelector("#product_qty");
const productId = document.querySelector("#product_id");
const add = document.querySelector("#add");
const remove = document.querySelector("#remove");
div('.loader').showModal();

const Loaded= async()=>{
  try {
    let cartItems = document.querySelector(".cart_length");
    let res = await fetch(`/getCart`);
    let data = await res.json();
    if(data){
      cartItems.innerHTML = data.length;
    };
    div('.loader').close();
  } catch (error) {
    console.log(error)
    div('.loader').close();
  }
}

function err(err){
  if(err){
    modalInfo.innerHTML = "Error#345"
    productModal.style.backgroundColor = "red"
    productModal.style.display = 'block';
  }
  else{
    productModal.style.display = 'block';
    Loaded();
  }
  setTimeout(()=>{
    productModal.style.display = 'none';
  }, 1500);
}




const manager= async(query, feed)=>{
 try {
  let res = await fetch("/postCart", {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      productId: productId.value,
      productQty: productQty.innerHTML,
      query: query
    }),
  });
  let result = await res.json();
  if (result.data){
     err(false);
     return feed(null, true);
  }
  else{
    err(true);
    return feed(null, false);
  }
 } catch (err){
   console.log(err)
 }
}

const cartB = async()=>{
  let res = await fetch("/getCart")
  let data = await res.json();
  data.forEach(item => {
    if(item.name == div('#product_name').innerHTML){
      cartBtn.classList.add('qty');
      add.classList.add('qty');
      remove.classList.add('qty');
    }
  });
}

const qtyCheck = ()=>{
  let val = Number(productQty.innerHTML);
  if(val < 2){
    remove.classList.add('qty');
    productQty.innerHTML = 1;
    return false;
  }
  else if(val >= 2){
    remove.classList.remove('qty');
    return true;
  }
}

cartBtn.addEventListener("click", () => {
  if(!cartBtn.classList.contains('qty')){
    div('.loader').showModal();
    manager("insert", (err, feed)=>{
      if(feed){
        cartBtn.classList.add('qty');
        add.classList.add('qty');
        remove.classList.add('qty');
      }
      div('.loader').close();
    });
  }
});

add.addEventListener('click', ()=>{
  if(!add.classList.contains('qty')){
    productQty.innerHTML = (Number(productQty.innerHTML) + 1);
    qtyCheck();
    return
  }
})
remove.addEventListener('click', ()=>{
  if(!remove.classList.contains('qty')){
    if(qtyCheck()){
      productQty.innerHTML = (Number(productQty.innerHTML) - 1);
      qtyCheck();
      return
    }
  }
})

document.querySelector("#closePro").addEventListener("click", () => {
  productModal.style.display = 'none';
});

cartB();
Loaded();
qtyCheck();