import { check, validationResult } from "express-validator";

const couponValidator = [
  check("code")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Code can not be empty!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("offer").not().isEmpty().withMessage("Offer is required").bail(),
  check("unit")
    .isIn(["percentage", "value"])
    .not()
    .isEmpty()
    .withMessage("Unit is required")
    .bail(),
  check("expiry_date")
    .not()
    .isEmpty()
    .withMessage("Expiry date is required")
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
        message: "Validation errors found! Failed to save coupon",
      });
    }

    next();
  },
];

export default couponValidator;
