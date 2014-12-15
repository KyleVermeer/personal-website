module.exports.index = function(req, res) {
    console.log("Controller received this message");
    res.render('index', { title: 'KV' } );
}
