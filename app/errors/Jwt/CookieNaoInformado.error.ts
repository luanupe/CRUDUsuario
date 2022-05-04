import { AbstractError } from "../../contracts/Abstract.error";

export class CookieNaoInformadoError extends AbstractError {
    constructor() {
        super('Token de autorização não informado.', 401);
    }
}
