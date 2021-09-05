const express = require('express');
const app = express();
const { nextApi, nextRouter } = require('../');

    app.use( express.json() )
    app.use('/', nextApi() ) // routes is default directory
    app.use('/api' , nextApi({ directory: 'api', options: {caseSensitive: false} }))

// module.exports = nextRouter(app);
 module.exports = app;