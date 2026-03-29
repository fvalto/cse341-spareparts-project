const { body, validationResult } = require('express-validator');
const sparepartsValidationRules = () => {
  return [
    body('partNumber')
      .isString()
      .withMessage('Part Number must be a string')
      .notEmpty()
      .withMessage('Part Number is required'),
    body('description')
      .isString()
      .withMessage('Description must be a string')
      .notEmpty()
      .withMessage('Description is required'),
    body('brand')
      .isString()
      .withMessage('Brand must be a string')
      .notEmpty()
      .withMessage('Brand is required'),
    body('category')
      .isString()
      .withMessage('Category must be a string')
      .notEmpty()
      .withMessage('Category is required'),
    body('compatibleModels')
      .isArray()
      .withMessage('Compatible models must be an Array')
      .notEmpty()
      .withMessage('Compatible models are required'),
    body('yearRange').isString().withMessage('Year range must be a string'),
    body('stock')
      .isInt({ min: 0 })
      .withMessage('Avaible stock must be an integer number')
      .notEmpty()
      .withMessage('Avaible stock is required'),
    body('price')
      .isFloat({ min: 1.0 })
      .withMessage('Sparepart price must be a float number, at least 1.00')
      .notEmpty()
      .withMessage('Sparepart price is required'),
  ];
};

const vehicleValidationRules = () => {
  return [
    body('brand')
      .isString()
      .withMessage('Brand must be a string')
      .isIn(['Chevrolet', 'Toyota', 'Omoda', 'Jaecoo'])
      .withMessage('Allowed brands: Chevrolet/Toyota/Omoda/Jaecoo')
      .notEmpty()
      .withMessage('Brand is required'),
    body('modelName')
      .isString()
      .withMessage('Model name must be a string')
      .notEmpty()
      .withMessage('Model name is required'),
    body('engine')
      .isString()
      .withMessage('Engine must be a string')
      .notEmpty()
      .withMessage('Engine is required'),
    body('carrossery')
      .isString()
      .withMessage('Carrossery must be a string')
      .notEmpty()
      .withMessage('Carrossery is required'),
    body('fuelType')
      .isString()
      .withMessage('Fuel Type must be a string')
      .isIn(['Diesel', 'Gasoline', 'Electric', 'Hybrid'])
      .withMessage('Allowed fuel types: Diesel/Gasoline/Electric/Hybrid')
      .notEmpty()
      .withMessage('Fuel Type is required'),
    body('countryOfOrigin')
      .isString()
      .withMessage('Country of origin must be a string')
      .notEmpty()
      .withMessage('Country of origin is required'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  sparepartsValidationRules,
  vehicleValidationRules,
  validate,
};
