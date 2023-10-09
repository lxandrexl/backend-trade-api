"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const inversify_1 = require("inversify");
const cards_dao_1 = require("../dao/cards.dao");
const types_1 = require("./types");
const create_token_usecase_1 = require("../../application/usecases/create-token.usecase");
const get_info_usecase_1 = require("../../application/usecases/get-info.usecase");
const container = new inversify_1.Container({ skipBaseClassChecks: true });
exports.Container = container;
container.bind(types_1.Types.CardsDAO).to(cards_dao_1.CardsDAO);
container.bind(types_1.Types.CreateToken).to(create_token_usecase_1.CreateTokenUseCase);
container.bind(types_1.Types.GetInfo).to(get_info_usecase_1.GetInfoUseCase);
//# sourceMappingURL=container.js.map