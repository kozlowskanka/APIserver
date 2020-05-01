const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.getById = async (req, res) => {
  
    try {
      const concert = await Concert.findById(req.params.id);
      if(!concert) res.status(404).json({ message: 'Not found' });
      else res.json(concert);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.postNew = async (req, res) => {
  
    try {
  
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert(
        {         
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image
        }
      );
      await newConcert.save();
      res.json({newConcert});
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.edit = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
  
    try {
      const concert = await(Concert.findById(req.params.id));
      if(concert) {
        concert.performer = performer, 
        concert.genre = genre, 
        concert.price = price, 
        concert.day = day,
        concert.image = image
        await concert.save();
        res.json({ concert });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
};

exports.deleteById = async (req, res) => {
  
  try {
    const concert = await(Concert.findById(req.params.id));
    if(concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(concert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getPerformer = async (req, res) => {

  try {

    const concert = await Concert.find({ performer: req.params.performer });
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);

  } 

  catch (err) {

    res.status(500).json({ message: err });

  }
};

exports.getGenre = async (req, res) => {

  try {

    const concert = await Concert.find({ genre: req.params.genre });
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);

  } 
  
  catch (err) {

    res.status(500).json({ message: err });

  }
};

exports.getPrice = async (req, res) => {

  try {

    const concert = await Concert.find({
      price: { $gte: req.params.price_min, $lte: req.params.price_max },
    });

    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);

  } 
  
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.getDay = async (req, res) => {

  try {

    const concert = await Concert.find({ day: req.params.day });
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);

  } 
  
  catch (err) {

    res.status(500).json({ message: err });

  }
};