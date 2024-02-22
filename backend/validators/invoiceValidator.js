import { check, validationResult } from "express-validator";

const serviceValidator = [
  check("client_id").not().isEmpty().bail().withMessage("Client is required!"),
  check("services")
    .isArray({
      min: 1,
    })
    .withMessage("Atleast 1 service must be selected")
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
        message: "Validation errors found! Failed to save invoice",
      });
    }

    next();
  },
];

export default serviceValidator;
