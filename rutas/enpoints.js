const express= require('express');
const router=express.Router();
const baseImg=require('../schemas/infImg');


router.post('/getImg',async (req,res)=>{
    
    try{
        console.log(req.body);
        const {fechini, fechfin}=req.body;
        const lista=await baseImg.find({$and:[{fecha:{$gt:fechini}},{fecha:{$lt:fechfin}}]});
        await res.json(lista);
       
    }catch{
        res.json("Algo a salido mal");
    }  
});
router.post('/postImg',async (req,res)=>{
    const fechas=req.body;
    try{
        const nuevaImg=new baseImg(fechas);
        await nuevaImg.save();
        res.json("registro creado");
    }catch{
        res.json("Algo a salido mal");
    }  
});




module.exports=router;