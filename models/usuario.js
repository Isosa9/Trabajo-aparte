const{Schema, model } = require ('mongoose');

const UsuarioSchema=Schema({
nombre:{
type: String,
required: true
},

email:{
type: String,
required: true,
unique: true

},

password:{
 type: String,
 required: true   
},

img:{
  type: String,  
},

role:{
type: String,
required: true,
default: 'USER_ROLE'

},

Google:{
type: Boolean,
default: false

},

});

UsuarioSchema.method('toJSON', function() {

  const { __v, _id, ...object} = this.toObject();


  object.uid = _id;


  return object;

})
module.exports = modul('Usuario', UsuarioSchema);
