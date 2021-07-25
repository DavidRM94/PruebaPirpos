const mongoose=require('mongoose');
const {Schema}=mongoose;

const newimagen=new Schema({
    fecha:Number, 
    hora:String,
    nombre:String, 
    urlImg:String
});

module.exports=mongoose.model('NuevaImg',newimagen);