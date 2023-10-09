import { IUseCase } from "../../../../../../@core/UseCase";
import { ReasonPhrases } from "http-status-codes";
import { inject, injectable } from "inversify";
import { Card, ICardsDAO } from "../database/cards.schema";
import { Types } from "../../infrastructure/ioc/types";
import { Request, Response } from "../../../../../../@core/controller";

@injectable()
export class CreateTokenUseCase implements IUseCase<Request<Card>, Response> {
  constructor(
    @inject(Types.CardsDAO) private _cardsDAO: ICardsDAO,
  ) {}

  async execute(req: Request<Card>): Promise<Response> {
    try {
      const { input } = req;

      const token = this.generateToken();
      const result = await this._cardsDAO.createToken(input, token);

      return { status: ReasonPhrases.OK.toLowerCase(), details: result };
    } catch (error) {
      throw error;
    }
  }

  private generateToken(): string {
    let pass = '';
    let size = 16;
    let str = process.env.STR;
 
    for (let i = 1; i <= size; i++) {
        let char = Math.floor(Math.random() * str.length);
 
        pass += str.substring(char, char + 1)
    }

    return pass;
  }
}