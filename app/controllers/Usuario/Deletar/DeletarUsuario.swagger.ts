import { faker } from "@faker-js/faker";
import {  userSchema, userRequired, userMock } from "../Visualizar/VisualizarUsuario.swagger";
import { genericErrorResponse, getApplicationErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";

// Response: Success

const successSchema = {
    type: 'object',
    required: [ ...userRequired ],
    properties: { ...userSchema },
};

const successExamples = {
    AUTHENTICATION_SUCCESS: {
        summary: 'Usuário removido',
        value: {...userMock},
    },
};

// Responses

const responses = {
    200: {
        description: 'Usuário removido com sucesso',
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
    summary: 'Deletar usuário informado no Bearer.',
    produces: 'application/json',
    security: [{ jwt: [] }],
    responses,
};
