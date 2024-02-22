import { check, validationResult } from "express-validator";

const serviceValidator = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Name can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("price").not().isEmpty().withMessage("Price is required").bail(),
  check("group_id").not().isEmpty().withMessage("Group is required").bail(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let response = {};

      errors.array().forEach((error) => {
        response[error.param] = error.msg;
      });

      return res.status(422).json({
        errors: response,
        message: "Validation errors found! Failed to save service",
      });
    }

    next();
  },
];

export default serviceValidator;
