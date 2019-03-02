

const express = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
const _=require('underscore')

const app = express();


// obtener
app.get('/usuario', function(req,res){

     //colocar la condicion de estado:true
     

     let desde = req.query.desde || 0;
     desde = Number(desde)

     let limite = req.query.limite || 5;
     limite = Number(limite)

     Usuario.find({estado:true}, 'nombre email estado role img google')
             .skip(desde)
             .limit(limite)
             .exec((err,usuarios) => {
               if(err){
                    return res.status(400).json({
                         ok:false,
                         err
                    });
               }
               // retornar el numero total de lo pedido
               Usuario.count({estado:true}, (err, conteo) => {
                    res.json({
                         ok:true,
                         usuarios,
                         cuantos:conteo
                    });
               })
               


             })

})



// enviar datos
app.post('/usuario', function(req,res){

     let body = req.body;

     
     //Vamos ahora a notificar lo que senvia y mandarlo a la base de datos
     let usuario = new Usuario({
          nombre: body.nombre,
          email:body.email,
          password:bcrypt.hashSync(body.password, 10),
          role:body.role
     })


     usuario.save( (err, usuarioDB) => {
          if(err){
               return res.status(400).json({
                    ok:false,
                    err
               });
          }

          // usuario.password = null;


          res.json({
               ok:true,
               usuario:usuarioDB
          });
     } )


     //con esto verificamos que se reciben los datos
     // if(body.nombre === undefined){
     //      res.status(400).json({
     //           ok:false,
     //           mensaje:"El nombre es necesario"
     //      });
     // }else{
     //      res.json({
     //           body
     //      });
     // }
     

})

//actualizar datos
app.put('/usuario/:id', function(req,res){
     const id = req.params.id; //De esta manera obtenemos el id quue requerimos para verificar en la base de datos y poder actualizar

     let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

     Usuario.findByIdAndUpdate( id, body, {new:true, runValidators: true},(err,usuarioDB) => {
          if(err){
               return res.status(400).json({
                    ok:false,
                    err
               });
          }
          res.json({
               ok: true,
               usuario:usuarioDB
          });

     })
     

})
// eliminar datos
app.delete('/usuario/:id', function(req,res){
     
     let id = req.params.id;
/*
*Version de eliminar desde la base de datos
     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) =>{
          if(err){
               return res.status(400).json({
                    ok:false,
                    err
               });
          }
          if(!usuarioBorrado){
               return res.status(400).json({
                    ok:false,
                    err:{
                         message:'Usuario no encontrado'
                    }
               });
          }

          res.json({
               ok:true,
               usuario:usuarioBorrado
          })
     })
*/
Usuario.findByIdAndUpdate( id, {estado:false}, {new:true},(err,usuarioDB) => {
     if(err){
          return res.status(400).json({
               ok:false,
               err
          });
     }
     res.json({
          ok: true,
          usuario:usuarioDB
     });

})
})

module.exports = app;