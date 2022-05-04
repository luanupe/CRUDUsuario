import { AbstractError } from "../../contracts/Abstract.error";

export class TipoInvalidoError extends AbstractError {
    constructor(type: string) {
        super(`Método de autenticação ${type} não autorizado.`, 401);
    }
}
