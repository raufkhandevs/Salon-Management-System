import { check, validationResult } from "express-validator";

const userValidator = [
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
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username can not be empty!")
    .bail()
    .isAlphanumeric()
    .withMessage("Username cannot contain any spaces or symbols")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  check("phone_number")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number is required!")
    .bail(),
  check("roles")
    .isArray({
      min: 1,
    })
    .withMessage("Atleast 1 role must be selected")
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
        message: "Validation errors found! Failed to save user",
      });
    }

    next();
  },
];

export default userValidator;
