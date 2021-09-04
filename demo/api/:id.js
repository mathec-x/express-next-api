module.exports.priority = 1
/**
 * @type { NextApi }
 */
 module.exports.get = (req,res,next) => {
    res.json({test: 'another-custom-url [id]', params: req.params});
}