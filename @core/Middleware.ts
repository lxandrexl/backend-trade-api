import { UnprocessableEntityError } from "./controller";
import { MySql } from './database/MySql';

type Request = {
    body: string,
    headers: {
        Authorization: string
    }
}

export class Middleware {
    static async validate(request: Request) {
        const { Authorization } = request.headers;
        if(!Authorization) throw new UnprocessableEntityError({ name: "Authorization", message: "Authorization not found." });
        const token = Authorization.replace(`Bearer pk_${process.env.STAGE}_`, "");
        const regexValidate = /^[A-Za-z0-9]*$/.test(token);
        if(!regexValidate || token.length != 16) throw new UnprocessableEntityError({ name: "Authorization", message: "Invalid token." });
        let result = await (new MySql().query(`SELECT * FROM ${process.env.SHOPS_TABLE} WHERE token = ?`, [token]));
        result = result[0];
        if(result <= 0) throw new UnprocessableEntityError({ name: "Authorization", message: "Invalid token." });
    }
}