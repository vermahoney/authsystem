import Joi from "joi";
import pick from "../utils/pick.js";

const validate = (schema) => {
  return (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({
        errors: {
          label: "key",
        },
        abortEarly: false,
      })
      .validate(object);

    console.log(value);
    console.log(error);

    next();
  };
};

export default validate;