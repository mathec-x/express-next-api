console.clear();

const express = require('express');
const app = express();
const { nextApi } = require('../');

    app.use( express.json() )
    app.use('/', nextApi() ) // routes is default directory
    app.use('/api' , nextApi({ directory: 'api', options: {caseSensitive: false} }))

    app.listen(3000);