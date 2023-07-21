const express = require('express');
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const router = express.Router()
const fs = require("fs");
const ws = fs.createWriteStream("G:/Mi unidad/cargaCSV/datos.csv");


const conection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"csv_db 6",
});



router.get("/", (req,res)=>{
    res.send("inicio")
});

router.get("/exportcsv",(req,res)=>{
    conection.query("SELECT * FROM consulta_mysql",function(err,data){
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData",jsonData);
        try {
            fastcsv.write(jsonData,{ headers:true})
            .on("finish", function(){
                res.send("Exportado")  
            }).pipe(ws);
            //setTimeout(function(){ws.end()},20000);
                        
        } catch (error) {
            console.log(error)
        }
        console.log("write to csv");
        
        
    })
   
})
module.exports = router;