import { faker } from "@faker-js/faker";
import {
    userSchema as userSchemaSignup,
    userRequired as userRequiredSignup,
    userMock as userMockSignup,
} from "../Cadastrar/CadastrarUsuario.swagger";
import { genericErrorResponse, getApplicationErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";

// Mocks

const addressRequired = [ 'id', 'logradouro', 'numero', 'bairro', 'cidade', 'pais', 'cep' ];

const addressSchema = {
    id: { type: 'integer' },
    logradouro: { type: 'string' },
    numero: { type: 'string' },
    bairro: { type: 'string' },
    cidade: { type: 'string' },
    pais: { type: 'string' },
    cep: { type: 'string' },
};

const addressMock = {
    id: faker.datatype.number(),
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    bairro: faker.address.streetAddress(),
    cidade: faker.address.cityName(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: faker.address.zipCode(),
};

const userRequired = [ 'id', ...userRequiredSignup ];

const userSchema = {
    id: { type: 'integer' },
    ...userSchemaSignup,
    endereco: {
        type: 'object',
        properties: { ...addressSchema },
        required: [...addressRequired],
    },
};

const userMock = {
    id: faker.datatype.number(),
    ...userMockSignup,
    endereco: [ {...addressMock} ],
};

// Response: Success

const successSchema = {
    type: 'object',
    required: [ ...userRequired ],
    properties: { ...userSchema },
};

const successExamples = {
    AUTHENTICATION_SUCCESS: {
        summary: 'Usuário encontrado',
        value: {...userMock},
    },
};

// Responses

const responses = {
    200: {
        description: 'Usuário autenticado com sucesso',
        content: {
            'application/json': {
                schema: successSchema,
                examples: successExamples,
            }
        },
    },
    401: unAuthorizedErrorResponse,
    404: getApplicationErrorResponse('Usuário não encontrado', [ { field: 'id', summary: 'ID do usuário inexistente.', message: `Usuário '${faker.datatype.number()}' não encontrado.`  } ]),
    500: genericErrorResponse,
};

// Documentation

export const documentation = {
    tags: ['Usuário'],
    summary: 'Buscar dados do usuário informado no Bearer.',
    produces: 'application/json',
    security: [{ jwt: [] }],
    responses,
};
