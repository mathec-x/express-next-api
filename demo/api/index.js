module.exports.priority = 3
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
 module.exports.get = (req,res) => {
    res.json({test: '/api/index.js'});
}