// const mongoose = require('mongoose');

// const ItemSchema = new mongoose.Schema({
//   itemId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   width: { type: Number, required: true },
//   depth: { type: Number, required: true },
//   height: { type: Number, required: true },
//   mass: { type: Number, required: true },
//   priority: { type: Number, required: true },
//   //remainingUses: { type: Number, default: 0 },
//   expiryDate: { type: Date,required:true },
//   //isExpired: { type: Boolean, default: false },
//   usageLimit: Number,
//   preferredZone: { type: String, required: true },
//   //isWaste: { type: Boolean, default: false },
// });
// module.exports = mongoose.model('Item', ItemSchema);
// const mongoose = require('mongoose');

// const ItemSchema = new mongoose.Schema({
//   itemId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   width: { type: Number, required: true },
//   depth: { type: Number, required: true },
//   height: { type: Number, required: true },
//   mass: Number,
//   priority: { type: Number, required: true },
//   expiryDate: Date,
//   usageLimit: { type: Number, default: 0 },
//   preferredZone: String,
//   containerId: String, // Container to which the item is assigned
//   position: {
//     startCoordinates: { width: Number, depth: Number, height: Number },
//     endCoordinates: { width: Number, depth: Number, height: Number },
//   },
//   isWaste: { type: Boolean, default: false },
// });

// module.exports = mongoose.model('Item', ItemSchema);
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  width: { type: Number, required: true },
  depth: { type: Number, required: true },
  height: { type: Number, required: true },
  mass: { type: Number, required: true },
  priority: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  usageLimit: { type: Number, required: true },
  preferredZone: { type: String, required: true },
  isWaste:{type:Boolean,default:false},
});

module.exports = mongoose.model('Item', itemSchema);