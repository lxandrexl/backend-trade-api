export interface ICardsDAO {
    createToken(card: Card, token: string)
    getInfo(token: string);
}

export type Card = {
    card_number: string,
    ccv: string,
    expiration_month: string,
    expiration_year: string,
    email: string
}