const {PrismaClient}= require('@prisma/client');
const prisma=new PrismaClient();
const homePage=async(req,res)=>{
    try{
        const restaurant=await prisma.restaurant.findFirst();
        const teamMembers= await prisma.employee.findMany();
        const meals=await prisma.repas.findMany();
        const csrfToken=req.csrfToken();
        res.render('index',{teamMembers,restaurant,meals,csrfToken});
    }
catch(err){
    res.status(500).send({error:err});
}finally{
    await prisma.$disconnect();
}
}
module.exports=homePage;