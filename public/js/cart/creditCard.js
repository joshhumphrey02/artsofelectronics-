const formControl = document.querySelectorAll('form_control');
const cardNumber = document.querySelector('#card_number');
const cardHolder = document.querySelector('#cardholder');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const cvv = document.querySelector('#cvv');
const save = document.querySelector('#save');


save.addEventListener('click', async()=>{
    let res = await fetch('/postCard',{
        method: "POST",
        headers: {
            "content-type": "application/json; Charset=UTF-8"
        },
        body: JSON.stringify({
            number: cardNumber.value,
            holder: cardHolder.value,
            year: year.value,
            month: month.value,
            cvv: cvv.value
        })
    });
    let data = await res.json();
    if(data){
        cardModal.close();
    }
})

const cardDetails = async ()=>{
    let res = await fetch('/getCard');
    let data = await res.json();
    if(data.length > 0){
        cardNumber.value = data[0].number,
        cardHolder.value = data[0].name,
        year.value = data[0].year,
        month.value = data[0].month,
        cvv.value = data[0].cvv
    }
    else{
        return
    }
}