import { faker } from "@faker-js/faker";
import {
    addressRequired as addressRequiredSignup,
    addressSchema as addressSchemaSignup,
    addressMock as addressMockSignup,
} from "../Cadastrar/CadastrarEndereco.swagger";

// Mocks

export const addressRequired = [ 'id', ...addressRequiredSignup ];

export const addressSchema = {
    id: { type: 'integer' },
    ...addressSchemaSignup,
};

export const addressMock = {
    id: faker.datatype.number(),
    ...addressMockSignup,
};
