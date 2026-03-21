const db = require('../models');
const Vehicles = db.vehicles;

exports.findAll = (req, res) => {
  /* #swagger.description = 'Endpoint to retrieve all vehicles from the database.' */
  Vehicles.find()
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Error retrieving vehicle data' });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving vehicles.',
      });
    });
};

exports.findOne = (req, res) => {
  /* #swagger.description = 'Endpoint to retrieve a single vehicle by its ID.' */
  const id = req.params.vehicles_id;
  Vehicles.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found vehicle with id: ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving vehicle with id: ' + id });
    });
};

exports.create = (req, res) => {
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
  vehicle
    .save(vehicle)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Error retrieving vehicle data' });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the vehicle.',
      });
    });
};

exports.update = (req, res) => {
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
  Vehicles.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update vehicles with id: ${id}.`,
        });
      } else res.send({ message: 'Vehicle was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating vehicles with id: ' + id,
      });
    });
};

exports.delete = (req, res) => {
  /* #swagger.description = 'Endpoint to delete an existing vehicles by its ID.' */
  const id = req.params.vehicles_id;
  Vehicles.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete vehicles with id=${id}`,
        });
      } else {
        res.send({
          message: 'Vehicle was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete vehicles with id=' + id,
      });
    });
};
