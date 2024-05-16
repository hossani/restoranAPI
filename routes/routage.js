const express=require('express');
const route=express.Router();
const addMealController=require('../controllers/addMealController');
const homePage=require('../controllers/homeController');
const aboutPage=require('../controllers/aboutController');
const contact=require('../controllers/contactController');
const signup=require('../controllers/signupController');
const upload = require('../middlewares/multerConfig');
const csrf = require('csurf');
const csrfProtection = csrf({ 
   cookie: true
    });
route.get('/home',csrfProtection,homePage);
route.post('/home',csrfProtection,signup);

route.get('/about',csrfProtection,aboutPage);
route.post('/about',csrfProtection,signup);

route.get('/contact',csrfProtection,contact.contactPage);
route.post('/signup',csrfProtection,signup);
route.post('/contact',csrfProtection,contact.sendMessage);


route.get('/addMeal',csrfProtection,addMealController.selectCategorie);
route.post('/addMeal',csrfProtection,upload,addMealController.createRepas);

module.exports=route;