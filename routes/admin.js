const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authentication = require('../middlewares/authentication');
const locals = require('../middlewares/locals');
const capFun = require('../config/roles');
router.get('/users', authentication, locals, capFun({
    capability: 'Users'
}), adminController.getUsers);
router.post('/edit-users', authentication, locals, capFun({
    capability: 'Users'
}), adminController.postEditUsers);
router.get('/deleteUser/:id', authentication, locals, capFun({
    capability: 'Users'
}), adminController.getDeleteUser);
router.get('/authorizations', authentication, locals, capFun({
    capability: 'Authorizations'
}), adminController.getAuthorizations);
router.post('/add-authorizations', authentication, locals, capFun({
    capability: 'Authorizations'
}), adminController.postAddAuthorizations);
router.post('/edit-authorizations', authentication, locals, capFun({
    capability: 'Authorizations'
}), adminController.postEditAuthorizations);
router.get('/deleteRole/:id', authentication, locals, capFun({
    capability: 'Authorizations'
}), adminController.getDeleteRole);
module.exports = router;