<template>
    
    <div id="app">
        <div id="logo">
            <img src="pirpos.png">
        </div>
        <div class="c1">
            <h2>Guardar imagen</h2>
            <form action="" @submit.prevent="postinput">
                <div class="camp">
                    <label>Nombre de la imagen</label>
                    <input type="text" name="nombre" class="input">
                </div>
                <div class="camp">
                    <label>Nombre quien sube la imagen</label>
                    <input type="text" name="nombreUsu" class="input">
                </div>
                <div class="camp">
                    <input type="file" name="imagen" >
                </div>
                <button type="submit" class="boton">Enviar</button>

            </form>
        </div>
        <div class="c1">
            <h2>Consulta de imagenes</h2>
            <div>
                <vue-englishdatepicker v-model="fechain" placeholder="fecha inicial" />
               
            </div>
            <div>
                <vue-englishdatepicker v-model="fechafin" placeholder="fecha final" />
                
            </div>
            <button @click="consultaImagenes" class="boton">Consultar</button>
            <h2 v-if="frecuencia.length>0">Resumen</h2>
            <ul v-if="frecuencia.length>0">
                <li v-for="(item,index) in frecuencia" v-bind:key="index"> {{item}}</li>
            </ul>
            

        </div>
        <div id="c3" v-if="listaImgenes.length>0">
            <table >
                <tr>
                    <th>
                        Url imagen
                    </th>
                    <th>
                        Responsable
                    </th>
                    <th>
                        Fecha y hora
                    </th>
                </tr>
                <tr v-for="(item,index) in listaImgenes" v-bind:key="index">
                    <td >{{item.urlImg}}</td>
                    <td >{{item.nombre}}</td>
                    <td >{{item.fecha}} - {{item.hora}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import VueEnglishdatepicker from 'vue-englishdatepicker';
export default {
    name: 'app',
    components:{
        VueEnglishdatepicker
    },
    data(){
        return{

            fecha:"",
            nombre:"",
            objimagen:Object,
            nombreUsu:"",
            fechain:"",
            fechafin:"",
            fechainnum:"",
            fechafinnum:"",
            listaImgenes:[],
            frecuencia:[]
        }
        
    },
    methods:{
        
        postinput(submitEvent){
            try{
                this.nombre=submitEvent.target.elements.nombre.value;
                this.nombreUsu=submitEvent.target.elements.nombreUsu.value;
                let fechaseleccionada=new Date()
                this.fecha=fechaseleccionada.getDate() + "/" + (fechaseleccionada.getMonth()+1) + "/" + fechaseleccionada.getFullYear();

                fetch('https://6z1vm3dcq2.execute-api.us-east-2.amazonaws.com/img/test',{
                    method:'POST',
                    mode: 'cors',
                    body:JSON.stringify({
                        nomb:this.nombre  + ".png",
                        imgCargada:submitEvent.target.elements.imagen.value
                    }),
                    headers:{
                        'accept':'application/json',
                        'Content-type':'application/json',
                    }
                })
                .then(res =>res.json())
                .then(data=>console.log(data));

                this.registrarImg();

            }catch{
                console.log("Algo salio mal");
            }
        },
        consultaImagenes(){
            this.fechainnum=(parseInt(this.fechain.substr(0,4))*10000)+(parseInt(this.fechain.substr(5,2))*100)+(parseInt(this.fechain.substr(8,2)));
            this.fechafinnum=(parseInt(this.fechafin.substr(0,4))*10000)+(parseInt(this.fechafin.substr(5,2))*100)+(parseInt(this.fechafin.substr(8,2)));
        
            fetch('/api/getImg',{
                method:'POST',
                body:JSON.stringify({
                    fechini:this.fechainnum,
                    fechfin:this.fechafinnum
                }),
                headers:{
                    'accept':'application/json',
                    'Content-type':'application/json',
                }

            })
                .then(res => res.json())
                .then(data=> {
                    console.log(data);
                    console.log("obtiene");
                    this.listaImgenes=data;
                    if(this.listaImgenes.length>0){
                        this.frecuencia=[];
                        let cantXhora=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        let horareg;
                        for(let i=0;i<this.listaImgenes.length;i++){
                            horareg=parseInt(this.listaImgenes[i].hora.substr(0,2));
                            if(horareg>=0){
                                cantXhora[horareg]++;
                            }
                        }
                        for(let i=0;i<cantXhora.length;i++){
                            if(cantXhora[i]>0){
                                this.frecuencia.push(" En la hora " + i + " se procesaron " + cantXhora[i] + " imagenes.");
                            }
                        }
                    }
                });
        },
        registrarImg(){
            let fecha=new Date;
            let fechanum=(fecha.getFullYear()*10000)+((fecha.getMonth()+1)*100)+(fecha.getDate());
            let hora;
            if(fecha.getHours()<10){
                hora="0" + fecha.getHours() + ":";
            }else{
                hora=fecha.getHours() + ":";
            }
            if(fecha.getMinutes()<10){
                hora=hora + "0" + fecha.getMinutes();

            }else{
                hora=hora + fecha.getMinutes();
            }
            let body={
                fecha:fechanum, 
                hora:hora,
                nombre:this.nombreUsu, 
                urlImg:this.nombre + ".png"
            }
            console.log(body);
            
            fetch('/api/postImg',{
                method:'POST',
                body:JSON.stringify(body),
                headers:{
                    'accept':'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {console.log(data)});
            
        }
    }
}
</script>
