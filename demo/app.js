const express = require('express');
const app = express();
const { nextApi, nextRouter } = require('../');

    app.use( express.json() )
    // app.use( nextApi({ base: '/teste' }) ) // routes is default directory
    // app.use(nextApi({ directory: 'api', base: '/api', options: {caseSensitive: false} }))

module.exports = nextRouter(app, { base: '/api' });
  // module.exports = app;