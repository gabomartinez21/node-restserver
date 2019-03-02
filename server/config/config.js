//=========
// Puerto
//==========

process.env.PORT = process.env.PORT || 3000;


//=========
// Entorno
//==========
process.env.NODE_ENV =process.env.NODE_ENV || 'dev';

//=========
// Base de datos
//==========

let urlDB;

// if(process.env.NODE_ENV == 'dev'){
//      urlDB = 'mongodb://localhost:27017/cafe'
// }else{
     urlDB = 'mongodb://pandatester:cpSCCykoOQgnz8C1@cluster0-shard-00-00-bexgb.mongodb.net:27017,cluster0-shard-00-01-bexgb.mongodb.net:27017,cluster0-shard-00-02-bexgb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
// }

process.env.URLDB = urlDB;


