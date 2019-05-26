const mongoose = require('mongoose');
const roleSchema = mongoose.Schema({
    roleName:String,
    capabilities:Array
});

module.exports = mongoose.model('Role', roleSchema);