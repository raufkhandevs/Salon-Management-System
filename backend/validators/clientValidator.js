import { check, validationResult } from "express-validator";

const clientValidator = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Name is required!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let response = {};

      errors.array().forEach((error) => {
        response[error.param] = error.msg;
      });

      return res.status(422).json({
        errors: response,
        message: "Validation errors found! Failed to save client",
      });
    }

    next();
  },
];

export default clientValidator;
