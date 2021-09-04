# express-next-api 

File Routing Framework Like Api Serverless for Node Express Next Generation.

## Install

```bash
npm install express-next-api
```
## usage

### the promisse of this package

```js
module.exports.priority = 1; // sort router organization

/**
 * @type {import("express-next-api").NextApi} // use type of exports as NextApi
 */module.exports.get = async (req, res, next) => { }

/**
 * @type {import("express-next-api").NextApi}
 */module.exports.post = async (req, res, next) => { }

/**
 * @type {import("express-next-api").NextApi}
 */module.exports.put = async (req, res, next) => { }

/**
 * @type {import("express-next-api").NextApi}
 */module.exports.del = async (req, res, next) => { }

/**
 * @type {import("express-next-api").NextApi}
 */module.exports.default = async (req, res, next) => { }
 
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
const express = require("express")
const { nextApi } = require("express-next-api")

const app = express()
    
      app.use('/', nextApi()) // default directory "routes"
      app.use('/custom', nextApi({ directory: "v2" })) // default directory "v2"

      app.listen(2000)
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