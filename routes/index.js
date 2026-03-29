const router = require('express').Router();
const passport = require('passport');
const spareparts = require('./spareparts.js');
const vehicles = require('./vehicles');

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  },
);
router.use('/spareparts', spareparts);
router.use('/vehicles', vehicles);

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.user = undefined;
    res.redirect('/');
  });
});

router.use('/', require('./swagger'));

module.exports = router;
