import { AbstractError } from "../../contracts/Abstract.error";

export class EmailEmUsoError extends AbstractError {
    constructor(email: string) {
        super(`E-mail '${email}' já está em uso.`, 412);
    }
}
