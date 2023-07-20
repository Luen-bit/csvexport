const express = require("express");
const app = express();
app.use('/',require('./router'));

app.listen(3010,function(){
    console.log("Servidor corriendo en http://localhost:3010/exportcsv");
})  