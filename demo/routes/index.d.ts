import { NextApi } from '../../lib/esm';
// doesn't work for root

//  req.params.id => 1
//  req.body.name => 'name'
// req.query.search => 'jhon'
declare const handler : NextApi<{id: number},{name: string}, {search: string} >;
export default handler;