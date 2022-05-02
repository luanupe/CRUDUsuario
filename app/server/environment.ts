import dotenv from "dotenv";

const file = process.env.NODE_ENV === 'test' ? '.env.testing' : '.env';
dotenv.config({ path: file });
