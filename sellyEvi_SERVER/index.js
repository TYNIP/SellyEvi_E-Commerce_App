/* SERVER SET UP */
const express = require('express');
const app = express();

// CONNECTIONS
const loaders = require('./loaders/index');
const {PORT} = require('./config');

//Server
async function startServer(){
    await loaders(app);

    app.listen(PORT, ()=>{
        console.log(`Server listening on PORT ${PORT}`)
    });
};

startServer();