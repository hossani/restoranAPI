const {PrismaClient}= require('@prisma/client');
const prisma=new PrismaClient();

const createRepas = async (req,res)=>{
    try{
    const image="/img/"+req.file.filename;    
    const {nom,prix,description,categorie}=req.body;
    const restaurant=await prisma.restaurant.findFirst();
    const categorieSelect=await prisma.categorie.findUnique({
        where:{
            nom:categorie
        }
    });

    const meal= await prisma.repas.create({
        data:{
nom,
description,
prix:parseInt(prix),
image,
id_cat:categorieSelect.id_cat,
id_rest:restaurant.id_rest
        }
    });
    res.redirect('/home');
}catch(err){
    console.log("Erreur",err);
    res.status(500).send('Erreur lors de l\'ajout du repas. Veuillez réessayer.');
}
finally{
    await prisma.$disconnect();
}
}

const selectCategorie=async(req,res)=>{
    try{
        const csrfToken=req.csrfToken();
        const categorie=await prisma.categorie.findMany();
        res.render('addMeal',{categorie,csrfToken});
    }catch(err){
        res.status(500).send('Erreur lors de l\'affichage. Veuillez réessayer.');
    }
    finally{
        await prisma.$disconnect();
    }
}

module.exports={createRepas,selectCategorie};