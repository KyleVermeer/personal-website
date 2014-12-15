module.exports.index = function(req, res) {
    console.log("Controller received this message");
    res.send("From the controller!")
}
