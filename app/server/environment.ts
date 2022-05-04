import dotenv from "dotenv";
import { JwtEntity } from "../entities/Jwt.entity";

const file = process.env.NODE_ENV === 'test' ? '.env.testing' : '.env';
dotenv.config({ path: file });

declare global {
    namespace Express {
        interface Request {
            usuario: JwtEntity;
        }
    }
}
