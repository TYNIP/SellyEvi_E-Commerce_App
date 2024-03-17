const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const {SESSION_SECRET} = require('../config');

/* API MIDDLEWARE */

module.exports = (app) =>{
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(compression());

    app.set('trust proxy', 1);
    
    /* CREATE USER COOKIE */
    app.use(
        session({  
          secret: SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
            }
        })
    );

    return app;
};