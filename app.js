const express = require("express");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

const app = express();
const fs = require("fs");
const ws = fs.createWriteStream("G:/Mi unidad/cargaCSV/datos.csv");

const conection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"csv_db 6",
});

app.get("/exportcsv",(req,res)=>{
    conection.query("SELECT * FROM consulta_mysql",function(err,data){
        if(err)throw err;

        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData",jsonData);

        fastcsv.write(jsonData,{ headers:true}).on("finish",function(){
            console.log("write to csv");
        })
        .pipe(ws);
        res.send(console.log("exportado correctamente"))
    })
    
})

app.listen(3010,function(){
    console.log("Servidor corriendo en http://localhost:3010/exportcsv");
})