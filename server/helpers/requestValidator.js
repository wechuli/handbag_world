const Joi = require("@hapi/joi");

module.exports = {
  validateBody(schema) {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json({ success: false, err: result.error });
      }
      next();
    };
  },
  schemas: {

    // login schema
    userRegistrationSchema: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string()
        .min(2)
        .max(100)
        .required(),
      lastname: Joi.string()
        .min(2)
        .max(100)
        .required(),
      password: Joi.string()
        .min(5)
        .required()
    }),

    // password schema
    userLogin: Joi.object({
      email: Joi.string()
        .email()
        .required(),

      password: Joi.string()
        .min(5)
        .required()
    })
  }
};
