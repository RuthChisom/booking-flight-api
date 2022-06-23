const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.example);

//fetch all flights
router.get('/flights', controller.flightList);

//fetch single flight
router.get('/flights/:id', controller.singleFlight);

//add new flight
router.post('/flights', controller.newFlight);

//update a flight
router.put('/flights/:id', controller.updateFlight);

//delete a flight
router.delete('/flights/:id', controller.deleteFlight);

module.exports = router;

