# express-next-api 

File Routing Framework Like Api Serverless for Node Express Next Generation.

## Install

```bash
npm install express-next-api
```
## usage

### the promisse of this package

```js

/**@type {import("express-next-api").NextMethods}*/
module.exports = {
    priority: 1, // sort router organization
    get: (req, res) => {
        res.json({ params: req.params, url: '/' });
    },
    put: (req, res) => {
        res.json({ params: req.params, url: '/' });
    },
    post: (req, res) => {
        res.json({ params: req.params, url: '/' });
    },
    del: (req, res) => {
        res.json({ params: req.params, url: '/' });
    }
}
 
```

## folder

 - note: does not work use / without a parameter

```php
├── v2
    └── index.js                    // localhost/custom/
├── routes
    ├── api
        ├── [id]
            └── index.js            // localhost/api/{req.params.id}/
        ├── users
            ├── :id.js or [id].js   // localhost/api/users/{req.params.id}
            └── index               // localhost/api/users/
        └── index.js
├── server.js
└── package.json
```

## Initialization

- server.js

```js
const express = require('express');
const app = express();
const { nextApi, nextRouter } = require('express-next-api');

    app.use( express.json() )
    app.use('/', nextApi() ) // routes is default directory
    app.use('/api' , nextApi({ directory: 'api', options: {caseSensitive: false} }))

module.exports = nextRouter(app); // routes is default directory
//or
module.exports = app;
```

## Custom Options

- `directory`: you can change custom directory from default "routes"
- `verbose`: show routes on console (default process.env.NODE_ENV !== 'production' )
- `options`: Express RouterOptions { caseSensitive/mergeParams/strict }

### usage with middlewares as array

```js
const { withAuth } = require("../middlewares")

/**
 * @type {[import("express-next-api").NextApi]}
 */module.exports.get = [
    withAuth,
    async (req, res) => { }
]
```

### usage with typescript

``` ts
    import { NextApi } from 'express-next-api';

    export const get : NextApi<{id: number},{name: string}, {search: string} >[] = [
        (_,__, next) => {
            next();
        },
        (req,res) => {
            //  req.params.id => 1
            //  req.body.name => 'name'
            // req.query.search => 'jhon'

            res.json({test: '/', params: req.params});
        },
    ]
```