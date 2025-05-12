// const express = require('express');
// const { getPlacementRecommendations, getAllItems } = require('../controllers/itemsController'); // Import the function

// const router = express.Router();

// // Route to get placement recommendations (now POST to match your logic)
// router.post('/placement', getPlacementRecommendations);

// // Route to get all items
// router.get('/', getAllItems);

// // Route to fetch placement recommendations (you can keep this as a GET route)
// router.get('/recommendations', getPlacementRecommendations);

// module.exports = router;



// const express = require('express');
// const { getPlacementRecommendations, getAllItems } = require('../controllers/itemsController');

// const router = express.Router();

// // Route to get placement recommendations
// router.post('/placement', getPlacementRecommendations);

// // Route to get all items
// router.get('/', getAllItems);

// module.exports = router;
const express = require('express');
const {
  getPlacementRecommendations,
  
} = require('../controllers/itemsController');

const router = express.Router();

router.post('/placement', getPlacementRecommendations);
//router.post('/retrieve', retrieveItem);

module.exports = router;