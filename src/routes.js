const express = require('express');


const app = express();

app.get('/get-repos',(request, response)=>{
    return response.send("hello teste;")
})

module.exports= app;