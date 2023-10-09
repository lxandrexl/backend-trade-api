import { IUseCase } from "../../../../../../@core/UseCase";
import { ReasonPhrases } from "http-status-codes";
import { inject, injectable } from "inversify";
import { ICardsDAO } from "../database/cards.schema";
import { Types } from "../../infrastructure/ioc/types";
import { Request, Response } from "../../../../../../@core/controller";

type data = {
  token: string
}

@injectable()
export class GetInfoUseCase implements IUseCase<Request<data>, Response> {
  constructor(
    @inject(Types.CardsDAO) private _cardsDAO: ICardsDAO,
  ) {}

  async execute(req: Request<data>): Promise<Response> {
    try {
      const { input } = req;

      //const response = this._cardsDAO.getInfo(input);

      return { status: ReasonPhrases.OK.toLowerCase(), details: { token: input.token } };
    } catch (error) {
      throw error;
    }
  }
}