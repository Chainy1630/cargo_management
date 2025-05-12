// const Item = require('../models/Item'); // Assuming the Item model is in the models folder

// exports.simulateDay = async (req, res) => {
//   try {
//     // Fetch all items
//     const items = await Item.find();

//     const expiredItems = [];
//     const updatedItems = [];

//     const today = new Date();

//     for (const item of items) {
//       // Check if the item is expired
//       if (item.expiryDate && item.expiryDate < today) {
//         item.isExpired = true;
//         expiredItems.push({
//           itemId: item.itemId,
//           name: item.name,
//           reason: 'Expired',
//         });
//       }

//       // Decrement remaining uses
//       if (item.remainingUses > 0) {
//         item.remainingUses -= 1;
//         updatedItems.push({
//           itemId: item.itemId,
//           name: item.name,
//           remainingUses: item.remainingUses,
//         });
//       }

//       // Save the updated item
//       await item.save();
//     }

//     // Respond with the simulation results
//     res.status(200).json({
//       message: 'Day simulated successfully!',
//       simulationResult: {
//         expiredItems,
//         updatedItems,
//       },
//     });
//   } catch (error) {
//     console.error('Error simulating day:', error.message);
//     res.status(500).json({ message: 'Error simulating day' });
//   }
// };
const Log = require('../models/Log'); // Ensure this path is correct
// Controller to fetch logs
exports.getLogs = async (req, res) => {
  console.log("Inside getLogs Controller");
  try {
    const {actionType, startDate, endDate,  itemId, userId, containerFrom, containerTo } = req.query;
    console.log("Received startDate:", req.query.startDate);
    console.log("Received endDate:", req.query.endDate);
    const query = {};

    // Build the query based on provided filters
    if (startDate) {
      query.timestamp = { $gte: new Date(startDate) }; // Start date filter
    }
    if (endDate) {
      query.timestamp = { ...query.timestamp, $lte: new Date(endDate) }; // End date filter
    }
    if (actionType) 
       query.actionType = actionType;
    if (itemId) query.itemId = itemId;
    if (userId) query.userId = userId;
    if (containerFrom) query.containerFrom = containerFrom;
    if (containerTo) query.containerTo = containerTo;

    const logs = await Log.find(query).sort({ timestamp: -1 });
    res.json({ logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Error fetching logs." });
  }
};