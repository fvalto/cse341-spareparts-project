const db = require('../models');
const Vehicles = db.vehicles;

exports.findAll = async (req, res) => {
  /* #swagger.description = 'Endpoint to retrieve all vehicles from the database.' */
  try {
    const data = await Vehicles.find();
    if (!data) {
      return res
        .status(400)
        .send({ message: 'Error retrieving vehiclues data' });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: 'Some error occurred while retrieving vehicles.',
    });
  }
};

exports.findOne = async (req, res) => {
  /* #swagger.description = 'Endpoint to retrieve a single vehicles by its ID.' */
  const id = req.params.vehicles;
  try {
    const data = await Vehicles.findById(id);
    if (!data) {
      return res
        .status(400)
        .send({ message: 'Not found vehicles with id: ' + id });
    }
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ message: 'Error retrieving vehicles with id: ' + id });
  }
};

exports.create = async (req, res) => {
  /* #swagger.description = 'Endpoint to create a new vehicle in the database.' */
  if (!req.body.modelName) {
    return res.status(400).send({
      message: 'Content can not be empty',
    });
  }
  const vehicle = new Vehicles({
    brand: req.body.brand,
    modelName: req.body.modelName,
    engine: req.body.engine,
    carrossery: req.body.carrossery,
    fuelType: req.body.fuelType,
    countryOfOrigin: req.body.countryOfOrigin,
  });

  try {
    const data = await vehicle.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: 'Some error occurred while creating the vehicle',
    });
  }
};

exports.update = async (req, res) => {
  /* #swagger.description = 'Endpoint to update an existing vehicles by its ID.'
    #swagger.parameters['body'] = {
    in: 'body',
    description: 'Vehicle update data',
    schema: {
        brand: "Chevrolet",
        modelName: "Silverado",
        engine: "3.0/5.3/6.2",
        carrossery: "Pickup",
        fuelType: "Diesel",
        countryOfOrigin: "US"
    }
} */
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.vehicles_id;
  try {
    const data = await Vehicles.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(400).send({
        message: `Cannot update vehicle with id: ${id}.`,
      });
    }
    res.send({ message: 'Vehicle was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: 'Error updating vehicle with id: ' + id,
    });
  }
};

exports.delete = async (req, res) => {
  /* #swagger.description = 'Endpoint to delete an existing vehicle by its ID.' */
  const id = req.params.vehicle_id;
  try {
    const data = await Vehicle.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).send({
        message: `Cannot delete vehicle with id:${id}`,
      });
    }
    res.send({ message: 'Vehicle was deleted successfully!' });
  } catch (err) {
    res.status(500).send({
      message: 'Error deleting vehicle with id: ' + id,
    });
  }
};
