const express = require('express');
const router = express.Router();
const db = require('../db');

const uuidv4 = require('uuid/v4');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {

    const { id } = req.params;

    res.json(db.concerts.find(item => item.id == id));
});

router.route('/concerts').post((req, res) => {

    const { performer, genre, price, day, image } = req.body;
    const data = {
        id: uuidv4(),
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image
    };
    db.concerts.push(data);
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {

    const { performer, genre, price, day }  = req.body;
    const { id } = req.params;

    db.concerts = db.concerts.map(item =>
      item.id == id ?
      {...item, performer: performer, genre: genre, price: price, day: day, image: image}
      : item);

    console.log('db.concerts:', db.concerts);
    res.json({ message: 'OK' });
  });

router.route('/concerts/:id').delete((req, res) => {

    const { id } = req.params;

    db.concerts = db.concerts.filter(item => item.id != id);
    console.log('db.concerts:', db.concerts);
    res.json({ message: 'OK' });
  });

module.exports = router;