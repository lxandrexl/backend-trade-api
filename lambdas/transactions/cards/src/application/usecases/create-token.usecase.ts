import { type IUseCase } from '../../../../../../@core/UseCase';
import { ReasonPhrases } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { type Card, ICardsDAO } from '../database/cards.schema';
import { Types } from '../../infrastructure/ioc/types';
import {
  type Request,
  type Response
} from '../../../../../../@core/controller';
import { IRedisDAO } from '../../../../../../@core/services';

@injectable()
export class CreateTokenUseCase implements IUseCase<Request<Card>, Response> {
  constructor(
    @inject(Types.CardsDAO) private readonly _cardsDAO: ICardsDAO,
    @inject(Types.RedisDAO) private readonly _redisDAO: IRedisDAO
  ) {}

  async execute(req: Request<Card>): Promise<Response> {
    const { input } = req;

    const token = this.generateToken();
    const result = await this._cardsDAO.createToken(input, token);
    const { ccv, ...card } = input;

    await this._redisDAO.set(
      token,
      JSON.stringify(card),
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      +(process.env.REDIS_TTL ?? '0')
    );

    return { status: ReasonPhrases.OK.toLowerCase(), details: result };
  }

  private generateToken(): string {
    let pass = '';
    const size = 16;
    const str = process.env.STR ?? '';
    for (let i = 1; i <= size; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.substring(char, char + 1);
    }
    return pass;
  }
}
