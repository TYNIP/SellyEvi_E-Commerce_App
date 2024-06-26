const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
const helmet = require('helmet');
const compression = require('compression');
const {SESSION_SECRET, allowedDomains} = require('../config');
/* API MIDDLEWARE */

module.exports = (app) =>{
    console.log('express running');
    app.set('trust proxy', 1);

    /* USER COOKIE */
    app.use(
        session({  
          secret: SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            },
            store: new MemoryStore({
                checkPeriod: 24 * 60 * 60 * 1000 
              }),
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
    return app;
};