const {PrismaClient}= require('@prisma/client');
const prisma=new PrismaClient();
const nodemailer=require('nodemailer');
const Joi = require('joi');
const emailSchema = Joi.string().email().required();
require('dotenv').config();

const signup=async(req,res)=>{
    try {
    const {email}=req.body;
    const clt=await prisma.client.findUnique({
        where:{
            email
        }
    });
    const { error } = emailSchema.validate(email);

if (error) return res.status(400).send(error.message);
    if(clt!=undefined) return res.status(409).send('Vous êtes déjà abonné'); //Le code de statut HTTP 409 signifie "Conflit"
    const rest=await prisma.restaurant.findFirst();
    await prisma.client.create({
        data:{
            email,
            id_rest:rest.id_rest
        }
    });
    const transporter = await nodemailer.createTransport({
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: 'apprenant.apprenant4@talents4starups.com',
            pass: process.env.pass
        }
    });
    const mailOptions = {
        from: 'apprenant.apprenant4@talents4starups.com',
        to: email,
        subject: 'Mail de remerciement',
        text: 'Merci pour votre abonnement dans notre site restaurant'
    };
        
        const info = await transporter.sendMail(mailOptions);
        if (req.url == '/signup') {
            res.redirect('/contact');
        } else if (req.url == '/about') {
            res.redirect('/about');
        } else {
            res.redirect('/home');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        res.status(500).send('Erreur lors de l\'envoi de l\'email');
    }finally{
        await prisma.$disconnect();
    }
}
module.exports=signup;