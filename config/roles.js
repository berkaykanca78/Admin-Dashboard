module.exports = function (options) {
  return function (req, res, next) {
    const Role = require('../models/role');
    Role.findOne({
        roleName: req.session.role
      })
      .then((role) => {
        if (role.capabilities.includes(options.capability)) {
          return next();
        } else {
          return res.redirect('/');
        }
      });

  }
}