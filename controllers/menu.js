exports.getIndex = (req, res, next) => {
    const User = require('../models/user');
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        User.find({ $or: [ { firstName: regex }, { lastName: regex } ] })
            .then(user => {
                res.render('menu/index', {
                    title: 'Dashboard',
                    path: '/',
                    username: req.session.username,
                    imgUrl: req.session.imgUrl,
                    role: res.locals.role,
                    capabilities: res.locals.capabilities,
                    users: user
                });
            }).catch(err => console.log(err));
        /*res.render('menu/index', {
            title: 'Dashboard',
            path: '/',
            username: req.session.username,
            imgUrl: req.session.imgUrl,
            role: res.locals.role,
            capabilities: res.locals.capabilities
        });*/
    } else {
        User.find()
            .then(user => {
                res.render('menu/index', {
                    title: 'Dashboard',
                    path: '/',
                    username: req.session.username,
                    imgUrl: req.session.imgUrl,
                    role: res.locals.role,
                    capabilities: res.locals.capabilities,
                    users: user
                });
            }).catch(err => console.log(err));
        /*res.render('menu/index', {
            title: 'Dashboard',
            path: '/',
            username: req.session.username,
            imgUrl: req.session.imgUrl,
            role: res.locals.role,
            capabilities: res.locals.capabilities
        });*/
    }
}
exports.getMessages = (req, res, next) => {
    res.render('menu/messages', {
        title: 'Messages',
        username: req.session.username,
        imgUrl: req.session.imgUrl,
        role: res.locals.role,
        capabilities: res.locals.capabilities
    });
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};