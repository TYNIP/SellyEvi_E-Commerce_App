const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes/index');
const swaggerLoader = require('../loaders/swagger');

/* SERVER ENTRY STRUCTURE */
module.exports = async(app) =>{
    const expressApp = await expressLoader(app);
    const passport = await passportLoader(expressApp);
    await routeLoader(app, passport);
    await swaggerLoader(app);

    //General error handler
    app.use((err, req, res, next) =>{
        const {message, status} = err;
        console.log('Error message');
        if(status === undefined){
            return res.status(404).send({message});
        } else {
            return res.status(status).send({message});
        }
    });
};