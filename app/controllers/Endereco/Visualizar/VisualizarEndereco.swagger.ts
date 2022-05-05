import { faker } from "@faker-js/faker";
import { getApplicationErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";
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

// Response: Success

const successSchema = {
    type: 'object',
    required: [ ...addressRequired ],
    properties: { ...addressSchema },
};

const successExamples = {
    ADDRESS_FOUND: {
        summary: 'Endereço encontrado',
        value: {...addressMock},
    },
};

// Responses

const responses = {
    200: {
        description: 'Endereço visualizado com sucesso',
        content: {
            'application/json': {
                schema: successSchema,
                examples: successExamples,
            }
        },
    },
    401: unAuthorizedErrorResponse,
    404: getApplicationErrorResponse('Endereço não encontrado', [ { field: 'id', summary: 'ID do usuário inexistente.', message: `Endereço '${addressMock.id}' não encontrado.`  } ]),
};

// Query

const enderecoIdQuery = {
    name: 'enderecoId',
    description: 'id do endereço',
    required: true,
    type: 'integer',
    in: 'path',
    example: 1,
};

// Documentation

export const documentation = {
    tags: ['Endereço'],
    summary: 'Buscar dados endereço do usuário informado no Bearer.',
    produces: 'application/json',
    security: [{ jwt: [] }],
    parameters: [ enderecoIdQuery ],
    responses,
};
