const dashboardRoutes = require('./menu');
const accountRoutes = require('./account');
const adminRoutes = require('./admin');
const errorController = require('../controllers/error');
module.exports = function (app) {
    app.use(dashboardRoutes);
    app.use(accountRoutes);
    app.use(adminRoutes);
    app.use(errorController.get404Page);
}