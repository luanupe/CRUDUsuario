import { AbstractError } from "../../contracts/Abstract.error";

export class CpfEmUsoError extends AbstractError {
    constructor(cpf: string) {
        super(`CPF '${cpf}' já está em uso.`, 412);
    }
}
