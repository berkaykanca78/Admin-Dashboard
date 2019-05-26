const mongoose = require('mongoose');
const capabilitySchema = mongoose.Schema({
    capName:String
});

module.exports = mongoose.model('Capability', capabilitySchema);