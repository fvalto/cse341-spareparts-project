const router = require('express').Router();
const spareparts = require('./spareparts.js');
const vehicles = require('./vehicles');

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
  res.send('Welcome to the Spare Parts API personal project!');
});
router.use('/spareparts', spareparts);
router.use('/vehicles', vehicles);

module.exports = router;
