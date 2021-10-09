/**
 * @type {import("../../../../lib/cjs/types").NextApi<{postId:string}>}
 */
 module.exports.Get = (req,res) => {
    res.json({postId: req.params.postId, param: req.params.param , url: '/[postId]/[param]'});
}