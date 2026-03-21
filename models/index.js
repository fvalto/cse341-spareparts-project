const dbConfig = require('../config/db.config.js');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.spareparts = require('./spareparts.js')(mongoose);
db.vehicles = require('./vehicles.js')(mongoose);

module.exports = db;
