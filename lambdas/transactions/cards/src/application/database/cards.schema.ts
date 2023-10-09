export interface ICardsDAO {
  createToken: (card: Card, token: string) => any;
  getInfo: (token: string) => any;
}

export interface Card {
  card_number: string;
  ccv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
}
