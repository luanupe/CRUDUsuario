import { AbstractError } from "../../contracts/Abstract.error";

export class SenhaIgualAntigaError extends AbstractError {
    constructor() {
        super('A nova senha não pode ser igual a antiga.', 409);
    }
}
