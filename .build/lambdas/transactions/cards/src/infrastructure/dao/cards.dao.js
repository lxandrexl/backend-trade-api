"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsDAO = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const MySql_1 = require("../../../../../../@core/database/MySql");
let CardsDAO = class CardsDAO extends MySql_1.MySql {
    constructor() {
        const options = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: +(process.env.MYSQL_PORT),
        };
        super(options);
        this.table = process.env.CARDS_TABLE;
    }
    async createToken(card, token) {
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
                resolve({ message: 'Tarjeta de credito registrada satisfactoriamente.' });
            }
            catch (error) {
                reject({ message: 'Ocurrio un error al registrar la tarjeta de credito.' });
            }
        });
    }
    async getInfo(token) {
        return new Promise(async (resolve, reject) => {
            try {
            }
            catch (error) {
            }
        });
    }
};
exports.CardsDAO = CardsDAO;
exports.CardsDAO = CardsDAO = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], CardsDAO);
//# sourceMappingURL=cards.dao.js.map