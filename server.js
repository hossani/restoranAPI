require('dotenv').config();
const express=require('express'); // Importez le module Express
const route=require('./routes/routage'); // Importez le module qui contient les routes
const app=express(); //Instance de l'express pour configurer le serveur et utiliser les routes
const  bodyParser = require('body-parser');
const requestLoggerMiddleware=require('./middlewares/requestLogger');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //Une configuration dans Express pour rendre les fichiers statiques disponibles sur le serveur . si un utilisateur demande l'URL /style.css, Express cherchera le fichier style.css dans le dossier public. Si le fichier existe, Express le servira directement à l'utilisateur
app.set('view engine','ejs');  // définit EJS comme moteur de rendu de templates pour Express
app.set('views','views'); // cherchera les fichiers de vue dans un dossier nommé views 
app.use(requestLoggerMiddleware);

app.use(route); // Utilisez le routeur défini dans routage.js

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});