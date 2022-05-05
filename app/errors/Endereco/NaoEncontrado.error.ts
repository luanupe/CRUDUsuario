import { AbstractError } from "../../contracts/Abstract.error";

export class NaoEncontradoError extends AbstractError {
    constructor(usuarioId: number, enderecoId: number) {
        super(`Endereço '${enderecoId}' não encontrado para o usuario ${usuarioId}.`, 404);
    }
}
