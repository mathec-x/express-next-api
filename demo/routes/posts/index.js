/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
module.exports.get = (req,res) => {
    res.json({params: req.params, url: '/posts/index'});
}

module.exports.post = (req,res) => {
    res.json({params: req.params, url: '/posts/index'});
}

module.exports.del = (req,res) => {
    res.json({params: req.params, url: '/posts/index'});
}