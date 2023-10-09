import { type IUseCase } from '../../../../../../@core/UseCase';
import { ReasonPhrases } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ICardsDAO } from '../database/cards.schema';
import { Types } from '../../infrastructure/ioc/types';
import {
  type Request,
  type Response
} from '../../../../../../@core/controller';
import { IRedisDAO } from '../../../../../../@core/services';

interface data {
  token: string;
}

@injectable()
export class GetInfoUseCase implements IUseCase<Request<data>, Response> {
  constructor(
    @inject(Types.CardsDAO) private readonly _cardsDAO: ICardsDAO,
    @inject(Types.RedisDAO) private readonly _redisDAO: IRedisDAO
  ) {}

  async execute(req: Request<data>): Promise<Response> {
    const { input } = req;
    // const response = this._cardsDAO.getInfo(input);
    const card = await this._redisDAO.get(input.token);
    let response = JSON.parse(card);
    if (card == null) response = { message: 'Información no autorizada.' };

    return { status: ReasonPhrases.OK.toLowerCase(), details: response };
  }
}
