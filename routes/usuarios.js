//Rutas a utlizar: /api/usuarios

const {Router}= require('express');
const{ check } = require('express-validator');
const{getUsuarios, crearUsuario, ActualizarUsuario, borrarUsuario}= require('../controllers/usuarios');

const router = Router();

//GET-MOSTRAR USUARIOS
router.get('/', getUsuarios);

//POST- CREAR USUARIOS
router.post('/',[
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   check('password','El password es obligatoro').not().isEmpty(),
   check('email','El email es obligatorio').isEmail(),


],
 crearUsuario);

 //PUT-ACTUALIZAR USUARIO
 router.put('/:id',[
    check('email','El nombre es obligatorio').not().isEmpty(),
   check('nombre','El email es obligatorio').isEmail(),
   check('role','El rol es obligatorio').isEmpty(),

   

 ],
 ActualizacionUsuario);

 //DELETE-BORRAR
 router.delete('./:id',
   borrarUsuario
 );

module.exports = router; 