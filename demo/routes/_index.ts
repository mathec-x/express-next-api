import { NextApi } from './../../src/types';
// doesn't work for root

export const get : NextApi<{id: number},{name: string}, {search: string} >[] = [
    (_, __, next) => {
        next();
    },
    (req,res) => {
        //  req.params.id => 1
        //  req.body.name => 'name'
        // req.query.search => 'jhon'

        res.json({test: '/', params: req.params});
    },
]