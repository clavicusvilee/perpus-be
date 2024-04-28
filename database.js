import mysql from 'mysql'
 
let connection = mysql.createConnection({
   host:        'magna.jagoanhosting.com',
   user:        'nanditox_programer',
   password:    'pL;,Er{s01@8',
   database:    'nanditox_perpustakaan'
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connection Succuessfully!');
   }
 })

export default connection;