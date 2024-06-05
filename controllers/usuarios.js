const { response} = require('express');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const Usuario = require('../models/usuario');

//GET - MOSTRAR USUARIOS

const getUsuarios =async(req, res) =>{

    const usuarios = await Usuario.find({}, 'nombre email password  role');
    
    res.status(200).json({
     ok: true,
     usuarios

    })
    
}

//POST - CREAR USUARIO

const crearUsuario = async ( req,res= response) =>{

    const {email, passoword,nombre} = req.body;

    const errores = validationResult(req );

    if(!errores.isEmpty()){
    return res.status(400).json({
    ok: false,
    errors: errores.mapped()

    });


}  

 try{
  const existeEmail = await Usuario.FindOne ({email});
  if(existeEmail){
    return res.status(400).json({
     ok: false,
     msg: 'El email ingresado ya existe!!!'   
    });
  }

  const usuario = new Usuario (req.body);
  
  //Encriptacion de contraseña
  const encriptar =bcrypt.genSaltSync();
  usuario.passoword = bcrypt.hashSync(passoword,
    encriptar);

    await usuario.save();

    res.status(200).json({
   ok: true,
   usuario

  });
 }  catch(error){
    console.log(error);
    res.status(500).json({
    pk: false,
    msg: 'Error inesperado no se puede grabar!!!'

    });

 }

}

//put-actualizar usuarios

ActualizarUsuario = async(req, res = response) =>{
    
    const uid = req.params.id;

    try{
    const usuario08 = await Usuario.frindById(uid);



if(!usuarioD8){
    return res.status(404).json({
   ok: false,
   msg: 'No se encuentra es ID de usuario'
    });
}

//Ejecutar actualizacion 

const campos = req.body;

if (usuarioD8.email == req.body.email){
   delete campos.email;

}else{
const existeEmail = await Usuario.FindOne({email: req.body.email});
if(existeEmail){
return res.status(400).json({

    ok: false,
    msg: 'ya existe un usuario con este Email'
});

}

}

delete campos.passoword;
delete campos.google;


const usuarioActualizado = await Usuario.frindByIdAndUpdate(uid, campos,{new: true});
    res.json({
  ok: true,
  usuario: usuarioActualizado

    });

} catch (error) {
    console.log(error);
    res.status(500).json({
    ok: false,
    msg: 'Error Inesperado,No se pudo actualizar!!'

    });
 

}
}
//DELETE - BORRAR

const borrarUsuario = async(req, res = response) =>{

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){

            return res.status(404).json({

                ok: false,

                msg: 'No se encuentra es ID de usuario'

            });

        }

        await Usuario.findByIdAndDelete(uid);

 

        res.json({

            ok: true,

            msg: 'Usuario Borrado correctamente!!!'

        });

 

    } catch (error) {

        console.log(error);

        res.status(500).json({

            ok: false,

            msg: 'No se puede borrar'

        });

    }

}
module.exports ={
    getUsuarios,
    crearUsuario,
    ActualizarUsuario,
    borrarUsuario,

}