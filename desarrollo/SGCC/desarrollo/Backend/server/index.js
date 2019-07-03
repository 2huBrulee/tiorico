/*
    Init of services
*/
var init = function(app) {
    const server = require('http').Server(app)
    
    return server
}

module.exports = init
