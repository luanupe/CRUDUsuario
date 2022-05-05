import { faker } from "@faker-js/faker";
import {
    userSchema as userSchemaSignup,
    userRequired as userRequiredSignup,
    userMock as userMockSignup,
} from "../Cadastrar/CadastrarUsuario.swagger";
import { genericErrorResponse, getApplicationErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";
import { addressMock, addressRequired, addressSchema } from "../../Endereco/Visualizar/VisualizarEndereco.swagger";

// Mocks

export const userRequired = [ 'id', ...userRequiredSignup ];

export const userSchema = {
    id: { type: 'integer' },
    ...userSchemaSignup,
    endereco: {
        type: 'object',
        properties: { ...addressSchema },
        required: [...addressRequired],
    },
};

export const userMock = {
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
