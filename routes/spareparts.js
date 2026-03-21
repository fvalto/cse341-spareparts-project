const routes = require('express').Router();
const {
  sparepartsValidationRules,
  validate,
} = require('../controllers/validator.js');
const spareparts = require('../controllers/spareparts.js');

routes.get('/', spareparts.findAll);
routes.get('/:sparepart_id', spareparts.findOne);
routes.post('/', sparepartsValidationRules(), validate, spareparts.create);
routes.put(
  '/:sparepart_id',
  sparepartsValidationRules(),
  validate,
  spareparts.update,
);
routes.delete('/:sparepart_id', spareparts.delete);

module.exports = routes;
