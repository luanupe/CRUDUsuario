import { faker } from "@faker-js/faker";
import { genericErrorResponse, getValidationErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";

// Mocks

export const addressRequired = [ 'logradouro', 'numero', 'bairro', 'cidade', 'pais', 'cep' ];

export const addressSchema = {
    logradouro: { type: 'string' },
    numero: { type: 'string' },
    bairro: { type: 'string' },
    cidade: { type: 'string' },
    pais: { type: 'string' },
    cep: { type: 'string' },
};

export const addressMock = {
    logradouro: faker.address.streetName(),
    numero: faker.address.buildingNumber(),
    bairro: faker.address.streetAddress(),
    cidade: faker.address.cityName(),
    estado: faker.address.state(),
    pais: faker.address.country(),
    cep: faker.address.zipCode(),
};

// Response: Success

const successSchema = {
    type: 'object',
    required: [ 'id', ...addressRequired ],
    properties: {
        id: { type: 'integer' },
        ...addressSchema,
    },
};

const successExamples = {
    CREATE_ACCOUNT_SUCCESS: {
        summary: 'Usuário criado',
        value: { id: faker.datatype.number(), ...addressMock },
    },
};

// Responses

const responses = {
    200: {
        description: 'Sucesso no processo de cadastro de endereço',
        content: {
            'application/json': {
                schema: successSchema,
                examples: successExamples,
            }
        },
    },
    401: unAuthorizedErrorResponse,
    422: getValidationErrorResponse([ 'cidade', 'logradouro' ]),
    500: genericErrorResponse,
};

// Body

const requestBodySchema = {
    type: 'object',
    properties: {
        ...addressSchema,
    },
    required: [ ...addressRequired, 'senha' ],
};

const requestBodyExamples = {
    CRIAR_CONTA: {
        summary: 'Criar novo usuário',
        value: {
            ...addressMock,
        },
    }
};

const requestBody = {
    required: true,
    content: {
        'application/json': {
            schema: requestBodySchema,
            examples: requestBodyExamples,
        },
    },
};

// Documentation

export const documentation = {
    tags: ['Endereço'],
    summary: 'Criar um novo endereço.',
    produces: 'application/json',
    security: [{ jwt: [] }],
    requestBody,
    responses,
};
