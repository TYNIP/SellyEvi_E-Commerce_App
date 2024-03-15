const swaggerui = require('swagger-ui-express');
const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

/* DOC SERVER PATH */

const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../swagger.yml'), 'utf8'));

module.exports = (app) =>{
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};