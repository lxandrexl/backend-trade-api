import { type IUseCase } from '../../../../../../@core/UseCase';
import { type IRedisDAO, RedisService } from '../../../../../../@core/services';
import { Container } from 'inversify';
import { CardsDAO } from '../dao/cards.dao';
import { Types } from './types';
import { CreateTokenUseCase } from '../../application/usecases/create-token.usecase';
import { GetInfoUseCase } from '../../application/usecases/get-info.usecase';
import { type ICardsDAO } from '../../application/database/cards.schema';

const container = new Container({ skipBaseClassChecks: true });
container.bind<IRedisDAO>(Types.RedisDAO).to(RedisService);
container.bind<ICardsDAO>(Types.CardsDAO).to(CardsDAO);
container.bind<IUseCase<any, any>>(Types.CreateToken).to(CreateTokenUseCase);
container.bind<IUseCase<any, any>>(Types.GetInfo).to(GetInfoUseCase);

export { container as Container };
