var main = require("./controllers/main.js");

module.exports = function(app) {

    app.get('/', main.index);
    app.get('/contact', main.contact);
    app.get('/aboutMe', main.aboutMe);
    app.get('/projects', main.projects);
}
