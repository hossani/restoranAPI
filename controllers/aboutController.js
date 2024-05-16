const {PrismaClient}= require('@prisma/client');
const prisma=new PrismaClient();

const aboutPage=async(req,res)=>{
    try{
        const teamMembers= await prisma.employee.findMany();
        const restaurant=await prisma.restaurant.findFirst();
        const csrfToken=req.csrfToken();
res.render('about',{teamMembers,restaurant,csrfToken});
    }
catch(err){
    res.status(500).send({error:err});
}
finally{
    await prisma.$disconnect();
}
}

module.exports=aboutPage;