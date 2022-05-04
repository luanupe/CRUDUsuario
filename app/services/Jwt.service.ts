import * as jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import { JwtEntity } from "../entities/Jwt.entity";

@injectable()
export class JwtService {

    private options: any;
    private publicKey: string;
    private privateKey: string;

    constructor () {
        this.publicKey = process.env.JWT_PUBLIC;
        this.privateKey = process.env.JWT_PRIVATE;

        this.options = {
            issuer: process.env.APP_NAME,
            audience: process.env.SERVER_HOST,
            expiresIn: process.env.JWT_EXPIRATION,
            algorithm: process.env.JWT_ALGORITHM,
        };
    }

    assinar = (data: JwtEntity): string => {
        return jwt.sign(data, this.privateKey, this.options);
    };

    validar = (token: string): JwtEntity => {
        const data: any = jwt.verify(token, this.publicKey, this.options);
        return { id: data.id, email: data.email };
    };

}
