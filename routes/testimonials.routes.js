const express = require('express');
const router = express.Router();
const db = require('../db');

const uuidv4 = require('uuid/v4');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {

    const { id } = req.params;

    res.json(db.testimonials.filter(item => item.id == id));
});

router.route('/testimonials/random').get((req, res) => {

    const randomItem = db.testimonials[Math.floor(Math.random()*db.testimonials.length)];

    res.json(randomItem);
});

router.route('/testimonials').post((req, res) => {

    const { author, text } = req.body;
    const data = {
        id: uuidv4(),
        author: author,
        text: text,
    };
    db.testimonials.push(data);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {

    const {author, text}  = req.body;
    const { id } = req.params;

    db.testimonials.map(item =>
      item.id === id ?
      {...item, author: author, text: text}
      : item);
    res.json({ message: 'OK' });
  });

router.route('/testimonials/:id').delete((req, res) => {

    const { id } = req.params;

    db.testimonials.filter(item => item.id !== id);
    res.json({ message: 'OK' });
  });

module.exports = router;