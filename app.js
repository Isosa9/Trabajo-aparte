// importacion de libreria del express
var express =require('express');

require('dotenv').config();
const cors = require('cors');
const { dbconnection } = require('./database/config');

//inicializando variables
var  app = express();

//configuracion CORS 
app.use(cors());

//Lectura y paseo del body
app.use(express.json());

//Base de datos
dbconnection();

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));

 
//escuchar peticiones
app.listen(process.env.PORT, () =>{
   console.log('Express server Puerto 3030:\x1b[32m%s\x1b[0m', 'online')
});

