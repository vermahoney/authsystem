import Joi from "joi";
import { password } from "./custom.validation";

const register={
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
};

export default{
    register,
};