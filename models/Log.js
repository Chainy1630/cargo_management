// const mongoose = require('mongoose');

// const LogSchema = new mongoose.Schema({
//   actionType: { type: String, required: true }, // e.g., placement, retrieval, disposal
//   itemId: String,
//   userId: String,
//   containerId: String,
//   timestamp: { type: Date, default: Date.now },
//   details: Object,
//   expiryDate: { type: Date, required:true },
//   usageLimit: Number,
// });

// module.exports = mongoose.model('Log', LogSchema);
// const mongoose = require('mongoose');

// const LogSchema = new mongoose.Schema({
//   actionType: { type: String, required: true }, // e.g., placement, retrieval, disposal
//   itemId: String,
//   userId: String,
//   containerId: String,
//   timestamp: { type: Date, default: Date.now },
//   details: Object,
//   expiryDate: { type: Date, required:true },
//   usageLimit: Number,
// });

// module.exports = mongoose.model('Log', LogSchema);
const mongoose = require('mongoose');
const { retrieveItem } = require('../controllers/itemsController');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  actionType: { type: String, required: true },
  itemId: { type: String },
  containerId: { type: String },
  expiryDate: { type: Date },
  usageLimit: { type: Number },
  details: { type: Object },
  retrieval_step: Number, // Can store additional details as needed
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;