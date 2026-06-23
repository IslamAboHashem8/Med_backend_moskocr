const express = require('express');
const router = express.Router();
const { predictForget } =require('../services/predictionservice');
// // ML mock function
// function mockPrediction(data) {
//     // logic بسيطة → احتمالية 50%
//     const willForget = Math.random() > 0.5;
//     return { willForget };
// }
router.post('/', (req, res) => {
  const { userId, doseTime } = req.body;
  const result = predictForget(userId, doseTime);

  res.json(result);
});

module.exports = router;