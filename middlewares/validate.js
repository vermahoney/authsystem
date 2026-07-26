import Joi from "joi";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.body.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    next();
  };
};

export default validate;