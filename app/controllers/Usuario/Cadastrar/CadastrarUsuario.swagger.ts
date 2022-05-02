// Mocks

import { faker } from "@faker-js/faker";
import { genericErrorResponse, getValidationErrorResponse, getApplicationErrorResponse } from "../../../contracts/Abstract.swagger";

const userRequired = [ 'nome', 'email', 'comunicacoes' ];

const userSchema = {
    nome: { type: 'string' },
    email: { type: 'string' },
    comunicacoes: { type: 'boolean' },
    cpf: { type: 'string' },
    telefone: { type: 'string' },
};

const userMock = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    cpf: faker.phone.phoneNumber('###########'),
    telefone: faker.phone.phoneNumber('###########'),
    comunicacoes: faker.datatype.boolean(),
};

// Response: Success

const successSchema = {
    type: 'object',
    required: [ 'id', ...userRequired ],
    properties: {
        id: { type: 'integer' },
        ...userSchema,
    },
};

const successExamples = {
    CREATE_ACCOUNT_SUCCESS: {
        summary: 'Usuário criado',
        value: { id: faker.datatype.number(), ...userMock },
    },
};

// Response: Precondition Failed

// Responses

const responses = {
    200: {
        description: 'Sucesso no processo de criação de conta',
        content: {
            'application/json': {
                schema: successSchema,
                examples: successExamples,
            }
        },
    },
    422: getValidationErrorResponse([ 'nome', 'telefone' ]),
    412: getApplicationErrorResponse([ 'email', 'cpf' ]),
    500: genericErrorResponse,
};

// Body

const requestBodySchema = {
    type: 'object',
    properties: {
        ...userSchema,
        senha: { type: 'string' },
    },
    required: [ ...userRequired, 'senha' ],
};

const requestBodyExamples = {
    CRIAR_CONTA: {
        summary: 'Criar novo usuário',
        value: {
            ...userMock,
            senha: faker.internet.password(),
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
    tags: ['Usuário'],
    summary: 'Criar um novo usuário.',
    produces: 'application/json',
    requestBody,
    responses,
};
