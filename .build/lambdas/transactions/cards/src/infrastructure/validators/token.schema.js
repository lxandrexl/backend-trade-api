"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSchema = void 0;
const Joi = require("joi");
exports.tokenSchema = Joi.object({
    token: Joi.string().min(16).max(16).required(),
}).required();
//# sourceMappingURL=token.schema.js.map