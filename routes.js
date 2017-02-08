'use strict';
var path = require('path');

module.exports = function(app) {

    app.use('/api/messages', require('./server/api/message'));
    app.use('/api/blogs', require('./server/api/blog'));
    app.use('/api/comments', require('./server/api/comment'));
    app.use('/api/movies', require('./server/api/movie'));
    app.use('/api/things', require('./server/api/thing'));
    app.use('/api/users', require('./server/api/user'));
    app.use('/auth', require('./server/auth'));


    app.route('/*')
        .get(function(req, res) {
            res.sendFile(app.get('appPath') + '/index.html');
        });
};
