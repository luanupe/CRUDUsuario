import { AbstractError } from "../../contracts/Abstract.error";

export class CredencialInvalidaError extends AbstractError {
    constructor(email: string) {
        super(`Não foi possível autenticar o usuário '${email}', verifique os dados e tente novamente.`, 403);
    }
}
