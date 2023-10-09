import { injectable } from "inversify";
import { Card, ICardsDAO } from "../../application/database/cards.schema";
import { MySql } from "../../../../../../@core/database/MySql";

@injectable()
export class CardsDAO extends MySql implements ICardsDAO {
  private table: string = process.env.CARDS_TABLE;
  constructor() { super(); }

  async createToken(card: Card, token: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
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
        const result = await this.query(raw, values);
  
        resolve({ message: 'Tarjeta de credito registrada satisfactoriamente.', token })
      } catch (error) {
        reject({ message: 'Ocurrio un error al registrar la tarjeta de credito.'});
      }
    })
  }

  async getInfo(token: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        
      } catch (error) {
        
      }
    })
  }
}
