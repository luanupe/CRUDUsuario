import { AbstractError } from "../../contracts/Abstract.error";

export class CookieInvalidoError extends AbstractError {
    constructor() {
        super(`Cookie de autorização mal formatado.`, 401);
    }
}
