/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { injectable } from 'inversify';
import {
  type Card,
  type ICardsDAO
} from '../../application/database/cards.schema';
import { MySql } from '../../../../../../@core/database/MySql';

@injectable()
export class CardsDAO extends MySql implements ICardsDAO {
  private readonly table: string = process.env.CARDS_TABLE ?? '';
  constructor() {
    super();
  }

  async createToken(card: Card, token: string): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      try {
        const raw = `
          INSERT INTO ${this.table} 
          (token, card_number, ccv, expiration_month, expiration_year, email, created_at)
          VALUES (?,?,?,?,?,?,?)
        `;
        const values = [
          token,
          card.card_number,
          card.ccv,
          card.expiration_month,
          card.expiration_year,
          card.email,
          new Date()
        ];
        await this.query(raw, values);

        resolve({
          message: 'Tarjeta de credito registrada satisfactoriamente.',
          token
        });
      } catch (error) {
        reject({
          message: 'Ocurrio un error al registrar la tarjeta de credito.'
        });
      }
    });
  }

  async getInfo(token: string): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      try {
        /* empty */
      } catch (error) {}
    });
  }
}
