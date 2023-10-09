"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTokenUseCase = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const inversify_1 = require("inversify");
const types_1 = require("../../infrastructure/ioc/types");
let CreateTokenUseCase = class CreateTokenUseCase {
    constructor(_cardsDAO) {
        this._cardsDAO = _cardsDAO;
    }
    async execute(req) {
        try {
            const { input } = req;
            const token = this.generateToken();
            const result = await this._cardsDAO.createToken(input, token);
            return { status: http_status_codes_1.ReasonPhrases.OK.toLowerCase(), details: result };
        }
        catch (error) {
            throw error;
        }
    }
    generateToken() {
        let pass = '';
        let size = 16;
        let str = process.env.STR;
        for (let i = 1; i <= size; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.substring(char, char + 1);
        }
        return pass;
    }
};
exports.CreateTokenUseCase = CreateTokenUseCase;
exports.CreateTokenUseCase = CreateTokenUseCase = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.Types.CardsDAO)),
    tslib_1.__metadata("design:paramtypes", [Object])
], CreateTokenUseCase);
//# sourceMappingURL=create-token.usecase.js.map