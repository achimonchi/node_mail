const 
    nodemailer = require('nodemailer'),
    excel = require('read-excel-file/node'),
    env = require('dotenv');

    // gunakan environtment variable
env.config();

// baca file excel
// ./test.xlsx adalah nama filenya
excel('./test.xlsx').then((rows)=>{
    rows.map((r,i)=>{
        if(i!=0){
            /*
            dengan asumsi, rows 0 adalah sebuah name_field
            dan rows 1 - seterusnya adalah rows yang diinginkan

            lalu, dari rows tersebut
            diambil index 0 nya, dan kirim ke function
            sendMail
            */
            sendMail(r[0])
        }
    })
    console.table(rows)
})

// setup transporter
const transporter = nodemailer.createTransport({
    service : 'gmail',
    secure:false,
    port : 587,
    auth:{
        user : process.env.EMAIL,
        pass : process.env.PASS
    },
    tls : {
        rejectUnauthorized : false
    }
});

// function sendMail
const sendMail=(data)=>{

    // configuration pada mail
    const mailOptions = {
        from : '"Admin NooBeeID" <no-reply@yourdomain.id>',
        to : data,
        subject : 'Test send mail',
        text : 'Hello World',
        html : `Mohon bantuan isi kuisioner <b>berikut</b> : https://forms.gle/9gkhgPEr8XJgEsxc9
        `   
    };

    // kirim email
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err) throw err;
        console.log(`Email sent to :  ${data}`)
    })
}