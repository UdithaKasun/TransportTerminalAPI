var router = require('express').Router();

router.use('/', require('./users'));
router.use('/terminal', require('./terminal'));
router.use('/terminal/driver', require('./driver'));
router.use('/terminal/bus', require('./bus'));
router.use('/terminal/ride', require('./ride'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;