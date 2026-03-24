const db = require('../models');
const SpareParts = db.spareparts;

exports.findAll = async (req, res) => {
  /* #swagger.description = 'Endpoint to retrieve all spareparts from the database.' */
  try {
    const data = await SpareParts.find();
    if (!data) {
      return res
        .status(400)
        .send({ message: 'Error retrieving sparepart data' });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: 'Some error occurred while retrieving spareparts.',
    });
  }
};

exports.findOne = async (req, res) => {
  /* #swagger.description = 'Endpoint to retrieve a single sparepart by its ID.' */
  const id = req.params.sparepart_id;
  try {
    const data = await SpareParts.findById(id);
    if (!data) {
      return res
        .status(400)
        .send({ message: 'Not found sparepart with id: ' + id });
    }
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ message: 'Error retrieving sparepart with id: ' + id });
  }
};

exports.create = async (req, res) => {
  /* #swagger.description = 'Endpoint to create a new sparepart in the database.' */
  if (!req.body.partNumber) {
    return res.status(400).send({
      message: 'Content can not be empty',
    });
  }

  const sparePart = new SpareParts({
    partNumber: req.body.partNumber,
    description: req.body.description,
    brand: req.body.brand,
    category: req.body.category,
    compatibleModels: req.body.compatibleModels,
    yearRange: req.body.yearRange,
    stock: req.body.stock,
    price: req.body.price,
    location: req.body.location,
  });

  try {
    const data = await sparePart.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: 'Some error occurred while creating the sparepart.',
    });
  }
};

exports.update = async (req, res) => {
  /* #swagger.description = 'Endpoint to update an existing sparepart by its ID.'
    #swagger.parameters['body'] = {
    in: 'body',
    description: 'Sparepart update data',
    schema: {
        partNumber: "19371896",
        description: 'Oil Filter',
        brand: 'Chevrolet',
        category: 'Engine',
        compatibleModels: ['Sail', 'Spark'],
        yearRange: '2020-2024',
        stock: 15,
        price: 12.99,
        location: 'Floor 1, Shelf B'
    }
} */
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.sparepart_id;
  try {
    const data = await SpareParts.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(400).send({
        message: `Cannot update sparepart with id: ${id}.`,
      });
    }
    res.send({ message: 'Sparepart was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: 'Error updating sparepart with id: ' + id,
    });
  }
};

exports.delete = async (req, res) => {
  /* #swagger.description = 'Endpoint to delete an existing sparepart by its ID.' */
  const id = req.params.sparepart_id;
  try {
    const data = await SpareParts.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).send({
        message: `Cannot delete spareparts with id:${id}`,
      });
    }
    res.send({ message: 'Sparepart was deleted successfully!' });
  } catch (err) {
    res.status(500).send({
      message: 'Error deleting sparepart with id: ' + id,
    });
  }
};
