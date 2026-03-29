const routes = require('express').Router();
const {
  vehicleValidationRules,
  validate,
} = require('../middleware/validator.js');
const vehicles = require('../controllers/vehicles.js');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', vehicles.findAll);
routes.get('/:vehicles_id', vehicles.findOne);
routes.post(
  '/',
  isAuthenticated,
  vehicleValidationRules(),
  validate,
  vehicles.create,
);
routes.put(
  '/:vehicles_id',
  isAuthenticated,
  vehicleValidationRules(),
  validate,
  vehicles.update,
);
routes.delete('/:vehicles_id', isAuthenticated, vehicles.delete);

module.exports = routes;
