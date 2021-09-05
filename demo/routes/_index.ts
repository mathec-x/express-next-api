import { NextApi } from './../../src/types';
// doesn't work for root

const handler : NextApi<{id: number},{name: string}, {search: string} > = (req,res) => {
        //  req.params.id => 1
        //  req.body.name => 'name'
        // req.query.search => 'jhon'

        return res.json({test: '/', params: req.params});
    };

export default handler;