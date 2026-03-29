const routes = require('express').Router();
const {
  sparepartsValidationRules,
  validate,
} = require('../middleware/validator.js');
const spareparts = require('../controllers/spareparts.js');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', spareparts.findAll);
routes.get('/:sparepart_id', spareparts.findOne);
routes.post(
  '/',
  isAuthenticated,
  sparepartsValidationRules(),
  validate,
  spareparts.create,
);
routes.put(
  '/:sparepart_id',
  isAuthenticated,
  sparepartsValidationRules(),
  validate,
  spareparts.update,
);
routes.delete('/:sparepart_id', isAuthenticated, spareparts.delete);

module.exports = routes;
