const express=require('express'); 
const path=require('path');
const mongoose=require('mongoose');
const cors=require('cors')


const app=express();

mongoose.set('useFindAndModify',true);
/*mongoose.connect('mongodb+srv://user_test:07ulMclyZCyHPFG9@pruebasdesarroladores.7nzjc.mongodb.net/Test?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true
    })
      .then(db=>console.log('Base de datos conectada'))
      .catch(err=>console.error(err));*/
mongoose.connect('mongodb+srv://IngDrmc:D.94Ing@primerabase.7su4s.mongodb.net/primeraBase?retryWrites=true&w=majority',{
   useCreateIndex:true,
   useNewUrlParser:true,
   useUnifiedTopology: true
   })
      .then(db=>console.log('Base de datos conectada'))
      .catch(err=>console.error(err));
// setings
app.set('port',process.env.PORT || '3000');
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'public') ));


app.use('/api',require('./rutas/enpoints'));

//antes de la ruta se puede pasar como parametro una ruta inicial para las peticiones 

const servidor=app.listen(app.get('port'),()=>{
   console.log("servidor conectado");
});