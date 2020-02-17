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
    }),

    // new brand schema

    brandSchema: Joi.object({
      name: Joi.string()
        .min(2)
        .max(100)
        .required()
    }),

    // product schema

    productSchema: Joi.object({
      name: Joi.string()
        .min(2)
        .max(100)
        .required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      brand: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      shipping: Joi.bool().required(),
      available: Joi.bool().required(),
      type: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      handles: Joi.number()
        .required()
        .max(7)
        .min(0),
      publish: Joi.bool().required()
    })
  }
};
