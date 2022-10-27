const divz = div=> document.querySelector(div);
const products = document.querySelectorAll("#product");
//const genCheckbox = document.querySelector("#genCheckbox");


const Loaded = async () => {
  let res = await fetch(`/getCart`);
  let data = await res.json();
  if(data){
    divz('#cart_value').innerHTML = divz(".cart_length").innerHTML = data.length;
    let check = data.some(item=> item.checked);
    let fee = check ? Number(divz("#fee").innerHTML) : 0;
    //let sum = data.reduce((sum, value)=> value.checked ? (sum + (value.price * value.product_qty)) : 0, 0);
    let total = ()=>{
      let tot = 0;
      data.forEach(item=>{if(item.checked == 1)return tot += (Number(item.price)* Number(item.product_qty))});
      return tot;
    }
    check ? divz("#checkout").classList.remove('noCurs') : divz("#checkout").classList.add('noCurs');
    data ? divz("#checkLab").classList.add('noCurs') : divz("#checkLab").classList.remove('noCurs');
    divz("#cartSub").innerHTML = total();
    divz('#total').innerHTML = divz("#genCheckout").innerHTML = total() + fee;
    products.forEach((product) => {
        const elem = tag=> product.querySelector(tag)
        elem('#productQty').innerHTML < 2 ? elem('#decrease').classList.add("noCurs") : elem('#decrease').classList.remove("noCurs");
        elem('#checkbox').value == 1 ? elem('#checkbox').classList.add('afterCheck') : elem('#checkbox').classList.remove('afterCheck')
    });
  }
};


const cch = async(elem)=>{
  let res = await fetch(`/getCart`);
  let data = await res.json();
  data.find(item=>{
    return item.name == elem('#product_name').innerHTML ? elem('#checkbox').value = item.checked : null;
  })
} 

const controller = async (query, id, elem, product) => {
  try {
    let res = await fetch("/postCart", {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ productId: id, query: query }),
    });
    let data = await res.json();
    if(data.data){
      query === "add" ? elem("#productQty").innerHTML = Number(elem("#productQty").innerHTML) + 1 : null;
      query === "remove" ? elem("#productQty").innerHTML = Number(elem("#productQty").innerHTML) - 1 : null;
      query === "delete" ? product.remove() : null;
      query === "check" ? cch(elem) : null;
    }
    return Loaded();
  } catch (err) {
    console.log(err);
  }
};

products.forEach((product) => {
  const elem = tag=> product.querySelector(tag);
  elem('#increase').addEventListener("click", () => controller("add", elem("#productId").value, elem, product));
  elem('#decrease').addEventListener("click", () =>  elem('#decrease').classList.contains("noCurs") ? null : controller("remove", elem("#productId").value, elem, product));
  elem('#delete').addEventListener("click", () => controller("delete", elem("#productId").value,  elem, product));
  elem('#checkbox').addEventListener("click", () => {
    controller("check", elem("#productId").value, elem, product)
    return genCheckbox.classList.remove("afterCheck");
  });
  elem('#fav').addEventListener("click", () => null);
});

divz('#next').addEventListener("click", async() =>{
   if(divz('#genCheckout').innerHTML == 0) return;
   let res = await fetch(`/getCart`);
   let data = await res.json();
   if(data.length > 0){
     if(data[0].user_id == null){
       return formHandle("log", true, "log_h", true, null);
     }
     else{
      let base = location.origin;
      return location.href = `${base}/checkout`
     }
   }
});
Loaded();