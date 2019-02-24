

require('./config/config');


const express = require('express');

const app = express();
const bodyParser= require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// obtener
app.get('/usuario', function(req,res){
     res.json('get Usuario');

})



// enviar datos
app.post('/usuario', function(req,res){

     let body = req.body;

     if(body.nombre === undefined){
          res.status(400).json({
               ok:false,
               mensaje:"El nombre es necesario"
          });
     }else{
          res.json({
               body
          });
     }
     

})

//actualizar datos
app.put('/usuario/:id', function(req,res){
     const id = req.params.id; //De esta manera obtenemos el id quue requerimos para verificar en la base de datos y poder actualizar
     res.json({
          id
     });

})
// eliminar datos
app.delete('/usuario', function(req,res){
     res.json('delete Usuario');

})

app.listen(process.env.PORT, () => {
     console.log('Escuchando el puerto: ', process.env.PORT);
})