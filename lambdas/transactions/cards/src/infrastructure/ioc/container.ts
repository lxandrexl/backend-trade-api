import { IUseCase } from "../../../../../../@core/UseCase";
import { Container } from "inversify";
import { CardsDAO } from "../dao/cards.dao";
import { Types } from "./types";
import { CreateTokenUseCase } from "../../application/usecases/create-token.usecase";
import { GetInfoUseCase } from "../../application/usecases/get-info.usecase";
import { ICardsDAO } from "../../application/database/cards.schema";

const container = new Container({ skipBaseClassChecks: true });
container.bind<ICardsDAO>(Types.CardsDAO).to(CardsDAO);
container.bind<IUseCase<any, any>>(Types.CreateToken).to(CreateTokenUseCase);
container.bind<IUseCase<any, any>>(Types.GetInfo).to(GetInfoUseCase);

export { container as Container };