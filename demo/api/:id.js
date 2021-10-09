module.exports.priority = 1
/**
 * @type { NextApi }
 */
 module.exports.get = (req,res,next) => {
    res.json({test: '/api/[id]', params: req.params});
}