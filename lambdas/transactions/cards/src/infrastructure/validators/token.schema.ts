import * as Joi from "joi";

export const tokenSchema = Joi.object({
    token: Joi.string().min(16).max(16).required(),
}).required();
