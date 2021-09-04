/**
 * @type {import("../../../../lib/cjs/types").NextApi<{postId:string, param:string}>}
 */
module.exports.Get = (req,res) => {
    res.json({params: req.params, url: '/[postId]/[param]'});
}