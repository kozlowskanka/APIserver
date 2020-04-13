const express = require('express');
const router = express.Router();
const db = require('../db');

const uuidv4 = require('uuid/v4');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {

    const { id } = req.params;

    res.json(db.seats.find(item => item.id == id));
});

router.route('/seats').post((req, res) => {

    const { day, seat, client, email } = req.body;
    const data = {
        id: uuidv4(),
        day: day,
        seat: seat,
        client: client,
        email: email
    };

    db.seats.push(data);
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {

    const { day, seat, client, email }  = req.body;
    const { id } = req.params;

    db.seats = db.seats.map(item =>
      item.id === id ?
      {...item, day: day, seat: seat, client: client, email:email}
      : item);

    console.log('db.seats:', db.seats);
    res.json({ message: 'OK' });
  });

router.route('/seats/:id').delete((req, res) => {

    const { id } = req.params;

    db.seats = db.seats.filter(item => item.id != id);
    console.log('db.seats:', db.seats);
    res.json({ message: 'OK' });
  });

module.exports = router;