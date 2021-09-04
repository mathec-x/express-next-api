/**
 * startsWith underscore 
 * will be ignored
 */
 module.exports.get = (req,res) => {
    res.json({test: 'another-custom-url _scheme', params: req.params});
}