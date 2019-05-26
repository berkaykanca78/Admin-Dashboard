module.exports = (req, res, next) => {
    res.locals.role = req.session.role;
    const Role = require('../models/role');
    Role.findOne({
            roleName: req.session.role
        })
        .then((role) => {
            res.locals.capabilities = role.capabilities;
            next();
        }).catch(err => console.log(err));
}