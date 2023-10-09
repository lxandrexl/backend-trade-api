"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardInfoHandler = exports.createCardTokenHandler = void 0;
require("reflect-metadata");
const controller_1 = require("../../../@core/controller");
const Guard_1 = require("../../../@core/Guard");
const Validator = require("./src/infrastructure/validators");
const http_status_codes_1 = require("http-status-codes");
const ioc_1 = require("./src/infrastructure/ioc");
const createCardTokenHandler = async function (event) {
    const container = new controller_1.ContainerController()
        .setMiddleware()
        .setInputMethod(controller_1.InputProcess.BODY)
        .setStatus(http_status_codes_1.StatusCodes.OK)
        .setValidator(Validator.cardSchema)
        .setGuard([(0, Guard_1.ValidateMethod)(['POST'])])
        .setContainerIoC(ioc_1.Container, ioc_1.Types.CreateToken);
    return await container.call(event);
};
exports.createCardTokenHandler = createCardTokenHandler;
const getCardInfoHandler = async function (event) {
    const container = new controller_1.ContainerController()
        .setMiddleware()
        .setInputMethod(controller_1.InputProcess.QUERY)
        .setStatus(http_status_codes_1.StatusCodes.OK)
        .setValidator(Validator.tokenSchema)
        .setGuard([(0, Guard_1.ValidateMethod)(['GET'])])
        .setContainerIoC(ioc_1.Container, ioc_1.Types.GetInfo);
    return await container.call(event);
};
exports.getCardInfoHandler = getCardInfoHandler;
//# sourceMappingURL=index.js.map