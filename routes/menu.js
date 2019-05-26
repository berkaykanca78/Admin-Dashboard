const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');
const authentication = require('../middlewares/authentication');
const locals = require('../middlewares/locals');
const capFun = require('../config/roles');
router.get('/', authentication, locals, capFun({
    capability: 'Dashboard'
}), menuController.getIndex);
router.get('/messages', authentication, locals, menuController.getMessages);
module.exports = router;