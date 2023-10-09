"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = void 0;
const Joi = require("joi");
const validateYear = (value, helper) => {
    let currentYear = new Date().getFullYear();
    let maxYear = currentYear + 5;
    if (currentYear <= value && maxYear >= value)
        return value;
    else
        return helper.message({ custom: "expiration_year is incorrect" });
};
exports.cardSchema = Joi.object({
    card_number: Joi.string().creditCard().required(),
    ccv: Joi.string().min(3).max(4).required(),
    expiration_month: Joi.string().min(1).max(2).required(),
    expiration_year: Joi.string().min(4).max(4).custom(validateYear),
    email: Joi.string().email().required()
}).required();
//# sourceMappingURL=card.schema.js.map