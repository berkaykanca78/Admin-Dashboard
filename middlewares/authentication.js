module.exports = (req, res, next) => {
    if (req.session.isAuthenticated != true) {
        req.session.redirectTo = req.url;
        return res.redirect('/login');
    }
    next();
}