"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const controller_1 = require("./controller");
class Middleware {
    static validate(request) {
        const { Authorization } = request.headers;
        if (!Authorization)
            throw new controller_1.UnprocessableEntityError({ name: "Authorization", message: "Authorization not found." });
        const token = Authorization.replace(`Bearer pk_${process.env.STAGE}_`, "");
        const regexValidate = /^[A-Za-z0-9]*$/.test(token);
        if (!regexValidate || token.length != 16)
            throw new controller_1.UnprocessableEntityError({ name: "Authorization", message: "Invalid token." });
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map