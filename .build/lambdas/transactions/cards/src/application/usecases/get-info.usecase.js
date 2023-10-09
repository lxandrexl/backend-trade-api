"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInfoUseCase = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const inversify_1 = require("inversify");
const types_1 = require("../../infrastructure/ioc/types");
let GetInfoUseCase = class GetInfoUseCase {
    constructor(_cardsDAO) {
        this._cardsDAO = _cardsDAO;
    }
    async execute(req) {
        try {
            const { input } = req;
            //const response = this._cardsDAO.getInfo(input);
            return { status: http_status_codes_1.ReasonPhrases.OK.toLowerCase(), details: { token: input.token } };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.GetInfoUseCase = GetInfoUseCase;
exports.GetInfoUseCase = GetInfoUseCase = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.Types.CardsDAO)),
    tslib_1.__metadata("design:paramtypes", [Object])
], GetInfoUseCase);
//# sourceMappingURL=get-info.usecase.js.map