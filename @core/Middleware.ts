import { UnprocessableEntityError } from "./controller";

type Request = {
    body: string,
    headers: {
        Authorization: string
    }
}

export class Middleware {
    static validate(request: Request) {
        const { Authorization } = request.headers;
        if(!Authorization) throw new UnprocessableEntityError({ name: "Authorization", message: "Authorization not found." });
        const token = Authorization.replace(`Bearer pk_${process.env.STAGE}_`, "");
        const regexValidate = /^[A-Za-z0-9]*$/.test(token);
        if(!regexValidate || token.length != 16) throw new UnprocessableEntityError({ name: "Authorization", message: "Invalid token." });
    }
}