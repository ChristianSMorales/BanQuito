'use strict'
var Cuenta=require('../models/cuenta');
var fs=require('path');
const path = require('path');
var controller={
    inicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );
    },
    getCuentas:function(req,res){
        Cuenta.find({}).sort().exec((err,cuentas)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!cuentas) return res.status(404).send({message:'No hay usuarios para mostrar'});
            return res.status(200).send({cuentas});
        })

    },
    saveCuenta:function(req,res){
        var cuenta=new Cuenta();
        var params=req.body;
        
        cuenta.cedula=params.cedula;
        cuenta.tipo_cuenta= params.tipo_cuenta;
        cuenta.monto_inicial= params.monto_inicial;
        cuenta.ingreso_promedio= params.ingreso_promedio;
        cuenta.numero_cuenta= params.numero_cuenta;

        cuenta.save((err,cuentaGuardado)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!cuentaGuardado) return res.status(404).send({message:'No se ha guardado el usuario'});
            return res.status(200).send({usuarioGuardado: cuentaGuardado});
        })
    
    },

    /*
    getLibro:function(req,res){
        var libroId=req.params.id;
        if(libroId==null) return res.status(404).send({message:'El libro no existe'});
        
        Cliente.findById(libroId,(err,libro)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!libro) return res.status(404).send({message:'El libro no existe'});
            return res.status(200).send({libro});
        })

    },
    deleteLibro:function(req,res){
        var libroId=req.params.id;
                
        Cliente.findByIdAndRemove(libroId,(err,libroBorrado)=>{
            if (err) return res.status(500).send({message:'Error al borrar los datos'});
            if(!libroBorrado) return res.status(404).send({message:'No se puede eliminar el libro'});
            return res.status(200).send({libro:libroBorrado});
        })

    },
    updateLibro:function(req,res){
        var libroId=req.params.id;
        var update=req.body;
                
        Cliente.findByIdAndUpdate(libroId,update,{new:true},(err,libroActualizado)=>{
            if (err) return res.status(500).send({message:'Error al actualizar los datos'});
            if(!libroActualizado) return res.status(404).send({message:'El libro no existe para actulizar'});
            return res.status(200).send({libro:libroActualizado});
        })

    },
    uploadImage:function(req,res){
        var libroId=req.params.id;
        var fileName='Imagen no subida';

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Cliente.findByIdAndUpdate(libroId,{imagen:fileName},{new:true},(err,libroActualizado)=>{
                    if (err) return res.status(500).send({message:'La imagen no se ha subido'});
                    if(!libroActualizado) return res.status(404).send({message:'El libro no existe y no se subiuo la imagen'});
                    return res.status(200).send({libro:libroActualizado});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extension no es valida'});
                });
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    getImagen:function(req,res){
        var file=req.params.imagen;
        var path_file="./uploads"+file;
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:'La imagen no existe'});
            }
        })
    }
    */

}
module.exports=controller;