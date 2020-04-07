const 
    nodemailer = require('nodemailer'),
    smtp = require('nodemailer-smtp-transport'),
    excel = require('read-excel-file/node'),
    env = require('dotenv');

env.config();

excel('./test.xlsx').then((rows)=>{
    const arr = [];
    rows.map((r,i)=>{
        if(i!=0){
            sendMail(r[0])
        }
    })
    // console.log(arr)
    console.table(rows)
})

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

const sendMail=(data)=>{
    const mailOptions = {
        from : '"Admin NooBeeID" <reyhan@noobee.id>',
        to : data,
        subject : 'Dari Nodejs',
        text : 'Coba coba'
    };

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err) throw err;
        console.log(`Email sent to :  ${data}`)
    })
    // console.log(data)
}