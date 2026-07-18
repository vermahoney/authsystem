require('dotenv').config();
const nodemailer = require('nodemailer');


const transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAUTH2',
        user: process.env.EMAIL_USER,
        clientId:process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});


// VERIFY THE CONNECTION CONFIGURATION 
transporter.verify((error, success)=>{
    if(error){
        console.error('error conncecting to email server :', error);
    }
    else{
        console.log('email server is ready to send messages');
    }
});

module.exports = transporter;