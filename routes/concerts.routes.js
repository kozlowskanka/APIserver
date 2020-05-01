const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getById);

router.get('/concerts/performer', ConcertsController.getPerformer);
router.get('/concerts/genre/:genre', ConcertsController.getGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertsController.getPrice);
router.get('/concerts/price/day/:day', ConcertsController.getDay);

router.post('/concerts', ConcertController.postNew);
router.put('/concerts/:id', ConcertController.edit);
router.delete('/concerts/:id', ConcertController.deleteById);

module.exports = router;