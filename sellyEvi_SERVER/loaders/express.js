const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const {SESSION_SECRET, allowedDomains} = require('../config');
/* API MIDDLEWARE */

module.exports = (app) =>{
    console.log('express running')
    app.set('trust proxy', 1);

    /* USER COOKIE */
    app.use(
        session({  
          secret: SESSION_SECRET,
          resave: false,
          saveUninitialized: true,
          cookie: {
            secure: false, //process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
            }
        })
    );

    /* Middleware */
    app.use(cors(
        {origin: allowedDomains,
            credentials: true,
        }));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(compression());
    console.log('express strops')
    return app;
};