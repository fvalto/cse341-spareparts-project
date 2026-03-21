const routes = require('express').Router();
const {
  vehicleValidationRules,
  validate,
} = require('../controllers/validator.js');
const vehicles = require('../controllers/vehicles.js');

routes.get('/', vehicles.findAll);
routes.get('/:vehicles_id', vehicles.findOne);
routes.post('/', vehicleValidationRules(), validate, vehicles.create);
routes.put(
  '/:vehicles_id',
  vehicleValidationRules(),
  validate,
  vehicles.update,
);
routes.delete('/:vehicles_id', vehicles.delete);

module.exports = routes;
