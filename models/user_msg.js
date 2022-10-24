module.exports = {
    mail: (user, code)=>{
        const mailOptions = {
        from: "Art of Electronics <joshuahumphrey579@gmail.com>",
        to: `${user}`,
        subject: `Successfull sign-up for ${user}`,
        text: `Your Registration was successful.. Your verification code is    ${code}`,
        html: `<div style="padding: .1rem;background-color: rgba(211, 211, 211, 0.774); margin: 2rem 0;">
            <h2 style=" height: 3rem; padding: .2rem 1rem;margin: 1rem 0 .3rem;border-bottom: 1px solid gray;">Art of Electronics</h2>
            <section style="padding: 0 1rem;">
                <h4>Your Registration was successful..</h4>
                <p>Your verification code is   <span style="color: blue;">${code}</span></p>
                <p>You're receiving this message because of a successful sign-up on Art of Electronics.</p>
                <p style="color: blue;">If you're not the one that carried out the Registration please Disregard this infomation.</p>
                <p>Thanks.</p>
                <p>Art of Electronics Team.</p>
                <br>
                <p style="font-size: .9rem; opacity: .5;">This message was sent from Art of Electronics, 20 Kpansia, Yenagoa, Bayelsa State</p>
            </section>
        </div>`
      }
      return mailOptions;
    },
    generate: (n)=>{
        let add = 1, max = 12 - add;
        if(n > max){
          return generate(max) + generate(n - max);
        }
        max = Math.pow(10, n+add);
        let min = max/10;
        let number  = Math.floor(Math.random() * (max - min + 1) + min);
        return ("" + number).substring(add);
    }
}