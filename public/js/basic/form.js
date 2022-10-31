const div = (div)=>document.querySelector(div);
const divs = (divs)=>document.querySelectorAll(divs);
function formHandle(btn, key, h, a, b) {
  btn === "log" ? div(".form_modal").classList.remove("reg_h") : div(".form_modal").classList.remove("log_h");
  btn === "reg" ? div(".form_modal").classList.add("reg_h") : div(".form_modal").classList.add("log_h");
  key ? div(".form_modal").showModal() : null;
  a ? div("#signinBtn").classList.add("afterScale") : div("#signinBtn").classList.remove("afterScale");
  b ? div("#registerBtn").classList.add("afterScale") : div("#registerBtn").classList.remove("afterScale")
  btn === "log" ? div(".register_form").style.display = "none" : div(".login_form").style.display = "none";
  btn === "reg" ? div(".register_form").style.display = "block" : div(".login_form").style.display = "block";
}
const clearer = (form)=>{
  divs('.form_control').forEach(item=>item.style.border = "0.1rem solid gray")
  divs('input').forEach(item=> item.value = '');
  form ? formHandle("log", null, "log_h", true, null) : formHandle("reg", null, "reg_h", null, true);
}
divs(".signin").forEach((logBtn) =>logBtn.addEventListener("click", () =>formHandle("log", true, "log_h", true, null)));
divs(".register").forEach((regBtn) =>regBtn.addEventListener("click", () =>formHandle("reg", true, "reg_h", null, true)));
div("#signinBtn").addEventListener("click", () => clearer(true));
div("#registerBtn").addEventListener("click", () => clearer(false));
div(".close").addEventListener("click", () =>div(".form_modal").close());
div("body").addEventListener("click", (e) =>{if (e.target.classList.contains("form_modal"))div(".form_modal").close()});
const userCheck = async( password, special, checked)=>{
  try {
    let email = special ? div('.A').value : div('.F').value
      if(!email.endsWith("@gmail.com")) return checked(null, false);
      let res = await fetch("/user/getUser", {
        method: "POST",
        headers: { "content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({email: email, password: password ? div('.B').value : null, special}),
      })
      let data = await res.json();
      return data.result ? checked(null, true) : checked(null, false);
  } catch (err) {
    return checked(null, false);
  }
}
divs(".form_control").forEach((control) => {
  let input = control.querySelector("input");
  let label = control.querySelector("label");
  control.addEventListener("mousedown", () => {
    label.style.fontSize = '.8rem';
    label.style.alignItems = 'start';
    input.style.opacity = 1;
    input.type == "password" ? div(".view").addEventListener("click", () =>input.type === "password" ? input.type = "text" :  input.type = "password") : null
  });
  control.addEventListener("mouseenter", () =>input.value.length == 0 ? control.style.border = "0.18rem solid blue" : null);
  control.addEventListener("mouseleave", () => {
    if (input.value.length == 0) {
      input.style.opacity = 0;
      label.style.fontSize = "initial";
      label.style.alignItems = "center";
      control.style.border = "0.1rem solid gray";
    }
  });
})
const RPC = ()=>{
  if(div('.G').value === div('.H').value) {
    divs('.form_control')[6].style.border = "0.18rem solid green";
    return divs('.form_control')[5].style.border = "0.18rem solid green";
  }
  divs('.form_control')[6].style.border = "0.18rem solid yellow";
  return divs('.form_control')[5].style.border = "0.18rem solid yellow";
}
const caller = (value, type, index, special)=>{
  if(type === "N" && value.length < 3) return divs('.form_control')[index].style.border = "0.18rem solid red";
  if(type == "E" && !value.endsWith("@gmail.com")) return divs('.form_control')[index].style.border = "0.18rem solid red";
  if(type == "LP" && value.length < 8) return divs('.form_control')[index].style.border = "0.18rem solid red";
  if(type == "RP" && value.length < 8) return divs('.form_control')[index].style.border = "0.18rem solid red";
  if(type == "E") return userCheck( null, special, (err, feed)=> feed ? divs('.form_control')[index].style.border = "0.18rem solid green" : divs('.form_control')[index].style.border = "0.18rem solid red");
  if(type == "LP") return userCheck( true, special, (err, feed)=> feed ? divs('.form_control')[index].style.border = "0.18rem solid green" : divs('.form_control')[index].style.border = "0.18rem solid red");
  if(type == "RP") return RPC();
  else return divs('.form_control')[index].style.border = "0.18rem solid green";
}
div('.A').addEventListener('keyup', ()=> caller(div('.A').value, "E", 0, true));
div('.B').addEventListener('keyup', ()=> caller(div('.B').value, "LP", 1, true));
div('.D').addEventListener('keyup', ()=> caller(div('.D').value, "N", 2));
div('.E').addEventListener('keyup', ()=> caller(div('.E').value, "N", 3));
div('.F').addEventListener('keyup', ()=> caller(div('.F').value, "E", 4, false));
div('.G').addEventListener('keyup', ()=> caller(div('.G').value, "RP", 5));
div('.H').addEventListener('keyup', ()=> caller(div('.H').value, "RP", 6));
const errDisplay = (msg, E)=>{
  div(E).innerHTML = msg;
  div(E).style.opacity = "1";
  setTimeout(()=>div(E).style.opacity = "0", 2000);
  return true;
}
const errorCheck = (start, end, msg, errbox)=>{
  let arr = ['.A', '.B', '.D', '.E', '.F', '.G', '.H']
  for(let i = start; i<end; i++){
    if(divs('.form_control')[i].style.borderColor === "red" || divs('.form_control')[i].style.borderColor === "yellow" || divs('.form_control')[i].style.borderColor === "gray"){
      if(i == 2 || i == 3) msg = "Invalid name input";
      if(i == 4) msg = "Invalid email address or email already registered";
      if(i == 0) msg = "Invalid email address or email not registered";
      if(i == 5 || i == 6 || i == 1) msg = "Password must be aleast 8 or password don't match";
      return errDisplay(msg, errbox);
    }
    else if(div(arr[i]).value.length == 0){ 
      return errDisplay('Invalid inputs', errbox)
    }
  }
}
const emailVerification = async(resend)=>{
  if(resend){
    div('.form_modal').close();
    div('.email_comfirm').showModal();
  }
  let res = await fetch("/form/emailVerification", {
    method: "POST",
    headers: { "content-type": "application/json;  charset=UTF-8"},
    body: JSON.stringify({email: div('.F').value}),
  });
  let data = await res.json();
  if (data.result) {
    div('.code_err').innerHTML = "Code sent only valid for 10 minutes.";
  }
  else{
    div('.code_err').innerHTML = "Error in connection, please try again.";
  }
}
div('#close_email').addEventListener("click", () =>{
  div('.email_comfirm').close();
  return formHandle("reg", true, "reg_h", null, true);
});
const userReg = async()=>{
  let res = await fetch("/form/register", {
    method: "POST",
    headers: {"content-type": "application/json;  charset=UTF-8"},
    body: JSON.stringify({firstName: div('.D').value, lastName: div('.E').value, email: div('.F').value, password: div('.G').value}),
  });
  let data = await res.json();
  if (data.result) {
    div('.email_comfirm').close();
    clearer(true); 
  }
  else{
    return errDisplay("Error occured, please check ur deatils!", "#E2")
  }
}

div('#C').addEventListener('click', (e)=>{if(errorCheck(0, 2, "", "#E1")) return e.preventDefault()});
div('#I').addEventListener("click", async (e) => {
  e.preventDefault();
  if(errorCheck(2, 7, "", "#E2")) return;
  if(div('#I').innerHTML == "Comfirm Email") return emailVerification(true);
  userReg();
})

div('#resend_code').addEventListener('click', ()=> emailVerification(false));

div('#code_sub').addEventListener('click', async()=>{
  let code = [div('.code_val1').value, div('.code_val2').value, div('.code_val3').value, div('.code_val4').value].join('')
  if(code.length == 0) return;
  let res = await fetch("/form/emailCode", {
    method: "POST",
    headers: {"content-type": "application/json;  charset=UTF-8"},
    body: JSON.stringify({code: code}),
  });
  let data = await res.json();
  if(data.code){
    div('.email_comfirm').close();
    div('#I').innerHTML = "Create Acoount";
    return formHandle("reg", true, "reg_h", null, true);
  }
  div('.code_err').innerHTML = "Please check ur code and try again";
})