// const Item = require('../models/Item');
// const Log = require('../models/Log'); // Assuming you have a Log model for logging actions // Ensure this path is correct
// const Container = require('../models/Container');
// const fs = require('fs');
// const path = require('path');
// const csvParser = require('csv-parser');

// exports.uploadContainerCSV = async (req, res) => {
//   if (!req.file) {
//     console.error('No file uploaded.');
//     return res.status(400).json({ message: 'No file uploaded.' });
//   }

//   const filePath = path.join(__dirname, '../uploads', req.file.filename);
//   const containers = [];
//   const errors = [];

//   // Parse the CSV file
//   fs.createReadStream(filePath)
//   .pipe(
//     csvParser({
//       headers: ['ContainerId', 'Zone', 'Width(cm)', 'Depth(cm)', 'Height(cm)'],
//       skipEmptyLines: true, // Ignore empty lines in the CSV file
//     })
//   )
//   .on('data', (row) => {
//     console.log('Parsed row:', row);

//     // Validate required fields
//     if (!row.ContainerId || !row.Zone || !row['Width(cm)'] || !row['Depth(cm)'] || !row['Height(cm)']) {
//       errors.push(`Missing required fields: ${JSON.stringify(row)}`);
//       return;
//     }

//     // Validate numeric fields
//     const width = validateNumber(row['Width(cm)']);
//     const depth = validateNumber(row['Depth(cm)']);
//     const height = validateNumber(row['Height(cm)']);
//     if (width === null || depth === null || height === null) {
//       errors.push(`Invalid numeric values: ${JSON.stringify(row)}`);
//       return;
//     }

//     const container = {
//       containerId: row.ContainerId,
//       zone: row.Zone,
//       width,
//       depth,
//       height,
//     };
//     containers.push(container);
//   });

// const validateNumber = (value) => {
//   if (!value || isNaN(value)) {
//     console.error(`Invalid number: ${value}`);
//     return null;
//   }
//   return parseFloat(value.trim());
// }};

// exports.uploadItemCSV = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded.' });
//   }

//   const filePath = path.join(__dirname, '../uploads', req.file.filename);
//   const items = [];

//   fs.createReadStream(filePath)
//     .pipe(csvParser({
//       headers: ['Item ID', 'Name', 'Width (cm)', 'Depth (cm)', 'Height (cm)', 'Mass (kg)', 'Priority (1-100)', 'Expiry Date (ISO Format)', 'Usage Limit', 'Preferred Zone'],
//       skipEmptyLines: true, // Ignore empty rows
//     }))
//     .on('data', (row) => {
//       try {
//         const item = {
//           itemId: row['Item ID'],
//           name: row['Name'],
//           width: validate(row['Width (cm)']),
//           depth: validate(row['Depth (cm)']),
//           height: validate(row['Height (cm)']),
//           mass: validate(row['Mass (kg)']),
//           priority: validate(row['Priority (1-100)'], 1, 100), // Ensure priority is within range
//           expiryDate: parseDate(row['Expiry Date (ISO Format)']),
//           usageLimit: row['Usage Limit'] === 'N/A' || row['Usage Limit'] === undefined
//             ? 0
//             : validate(row['Usage Limit']),
//           preferredZone: row['Preferred Zone'],
//         };

//         // Validate numeric fields
//         if (
//           item.width === null ||
//           item.depth === null ||
//           item.height === null ||
//           item.mass === null ||
//           item.priority === null
//         ) {
//           console.error(`Invalid numeric values for item: ${JSON.stringify(item)}`);
//           throw new Error('Invalid numeric value');
//         }

//         items.push(item);
//       } catch (error) {
//         console.error(`Error processing row: ${JSON.stringify(row)}, Error: ${error.message}`);
//       }
//     })
//     .on('end', async () => {
//       try {
//         const bulkOps = items.map((item) => ({
//           updateOne: {
//             filter: { itemId: item.itemId },
//             update: { $set: item },
//             upsert: true,
//           },
//         }));

//         await Item.bulkWrite(bulkOps);

//         await logAction('uploadItems', { itemCount: items.length });

//         res.status(200).json({ message: 'Items uploaded successfully!', items });
//       } catch (error) {
//         console.error('Error saving items to database:', error.message);
//         res.status(500).json({ message: 'Error saving items.' });
//       }
//     })
//     .on('error', (error) => {
//       console.error('Error reading CSV file:', error.message);
//       res.status(500).json({ message: 'Error reading CSV file.' });
//     });
// };

// const validate = (value, min = null, max = null) => {
//   if (!value || isNaN(value)) {
//     console.error(`Invalid number: ${value}`);
//     return null;
//   }

//   const num = parseFloat(value.trim());
//   if (min !== null && num < min) return null;
//   if (max !== null && num > max) return null;
//   return num;
// };

// const parseDate = (value) => {
//   const date = new Date(value);
//   return isNaN(date.getTime()) ? null : date;
// };

// const logAction = async (action, details) => {
//   console.log(`Action logged: ${action}`, details);
// };

const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const Item = require('../models/Item');
const Container = require('../models/Container');
const Log = require('../models/Log'); // Logging actions

// Helper function to log actions
const logAction = async (actionType, details) => {
  const logEntry = new Log({ actionType, ...details });
  await logEntry.save();
};
const parseDate = (dateStr) => {
  if (!dateStr || dateStr === 'N/A') return null;
  return new Date(dateStr);
};
// Handle Item CSV Upload
exports.uploadItemCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  const items = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      const item = {
        itemId: row['Item ID'],
        name: row['Name'],
        width: parseFloat(row['Width (cm)']),
        depth: parseFloat(row['Depth (cm)']),
        height: parseFloat(row['Height (cm)']),
        mass: parseFloat(row['Mass (kg)']),
        priority: parseInt(row['Priority (1-100)']),
        expiryDate: parseDate(row['Expiry Date (ISO Format)']),
        usageLimit: row['Usage Limit'] === 'N/A' ? 0 : parseInt(row['Usage Limit']),
        preferredZone: row['Preferred Zone'],
      };
      items.push(item);
    })
    .on('end', async () => {
      try {
        const bulkOps = items.map(item => ({
          updateOne: {
            filter: { itemId: item.itemId },
            update: { $set: item },
            upsert: true,
          },
        }));

        await Item.bulkWrite(bulkOps);

        // await logAction('uploadItems', { itemCount: items.length });

        res.status(200).json({ message: 'Items uploaded successfully!', items });
      } catch (error) {
        console.error('Error saving items:', error.message);
        res.status(500).json({ message: 'Error saving items.' });
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error.message);
      res.status(500).json({ message: 'Error reading CSV file.' });
    });
};

exports.uploadContainerCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  const containers = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      
      const container = {
        containerId: row['Container ID'],
        zone: row['Zone'],
        width: parseFloat(row['Width(cm)']),
        depth: parseFloat(row['Depth(cm)']),
        height: parseFloat(row['Height(cm)']),
        maxCapacity: parseFloat(row['Width(cm)']) * parseFloat(row['Depth(cm)']) * parseFloat(row['Height(cm)']),
      };
      containers.push(container);
    })
    .on('end', async () => {
      try {
        const bulkOps = containers.map(container => ({
          updateOne: {
            filter: { containerId: container.containerId },
            update: { $set: container },
            upsert: true,
          },
        }));

        await Container.bulkWrite(bulkOps);

        // await logAction('uploadContainers', { containerCount: containers.length });

        res.status(200).json({ message: 'Containers uploaded successfully!', containers });
      } catch (error) {
        console.error('Error saving containers:', error.message);
        res.status(500).json({ message: 'Error saving containers.' });
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error.message);
      res.status(500).json({ message: 'Error reading CSV file.' });
    });
};

