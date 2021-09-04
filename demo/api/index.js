module.exports.priority = 3
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
 module.exports.get = (req,res) => {
    res.json({test: 'another-custom-url', params: req.params, route: req.headers});
}