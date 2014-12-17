module.exports.index = function(req, res) {
    res.render('index', { title: 'KV' } );
}

module.exports.contact = function(req, res) {
    res.render('contact', { title: 'Contact Me'} );
}
