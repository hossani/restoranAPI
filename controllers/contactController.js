const {PrismaClient}= require('@prisma/client');
const prisma=new PrismaClient();
const nodemailer=require('nodemailer');
const Joi = require('joi');
const emailSchema = Joi.string().email().required();
require('dotenv').config();

const contactPage=async(req,res)=>{
    try{
        const csrfToken=req.csrfToken();
        const restaurant=await prisma.restaurant.findFirst();
        
res.render('contact',{restaurant,csrfToken});
    }
catch(err){
    res.status(500).send({error:err});
}finally{
    await prisma.$disconnect();
}
}

const sendMessage=async(req,res)=>{
    try{
const {email,name,message,subject}=req.body;
const { error } = emailSchema.validate(email);

if (error) return res.status(400).send(error.message);

const transporter = await nodemailer.createTransport({
    host: process.env.host,
    port: 465,
    secure: true,
    auth: {
        user:  process.env.user,
        pass: process.env.pass
    }
});
const mailOptions = {
    from:  process.env.user,
    to: myemail,
    subject: subject,
    text: "Name:"+name+"\n"+"Email:"+email+"\n"+"Message:"+message
};

const info = await transporter.sendMail(mailOptions);
 const restaurant=await prisma.restaurant.findFirst();
 const csrfToken=req.csrfToken();
res.render('contact',{restaurant,csrfToken});
}
catch(err){ res.status(500).send({error:err}); }
finally{
    await prisma.$disconnect();
}
}

module.exports={contactPage,sendMessage};