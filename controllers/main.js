var MILLISECONDS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

module.exports.index = function(req, res) {
    res.render('index', { title: 'Kyle Vermeer Personal Site' } );
}

module.exports.contact = function(req, res) {
    res.render('contact', { title: 'Contact Kyle'} );
}

module.exports.aboutMe = function(req, res) {
    var birthday = new Date(1991, 4, 2);
    var now = Date.now();
    var elapsedTime = now - birthday;
    var yearsOld = Math.floor(elapsedTime / MILLISECONDS_IN_YEAR);
    var data = { title: 'About Kyle', yearsOld : yearsOld };
    res.render('aboutMe', data);
}

module.exports.projects = function(req, res) {
    res.render('projects', { title: 'Projects'} );
}
