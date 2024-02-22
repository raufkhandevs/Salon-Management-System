import { check, validationResult } from "express-validator";

const roleValidator = [
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
  check("permissions")
    .isArray({
      min: 1,
    })
    .withMessage("Atleast 1 permission must be selected")
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
        message: "Validation errors found! Failed to save role",
      });
    }

    next();
  },
];

export default roleValidator;
