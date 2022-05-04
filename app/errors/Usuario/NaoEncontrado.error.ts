import { AbstractError } from "../../contracts/Abstract.error";

export class NaoEncontradoError extends AbstractError {
    constructor(id: number) {
        super(`Usuário '${id}' não encontrado.`, 404);
    }
}
