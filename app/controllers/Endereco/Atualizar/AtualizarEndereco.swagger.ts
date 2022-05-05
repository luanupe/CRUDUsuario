import { getApplicationErrorResponse, getValidationErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";
import { requestBody } from "../Cadastrar/CadastrarEndereco.swagger";
import { addressRequired, addressSchema, addressMock } from "../Visualizar/VisualizarEndereco.swagger";

// Response: Success

const successSchema = {
    type: 'object',
    required: [ ...addressRequired ],
    properties: { ...addressSchema },
};

const successExamples = {
    ADDRESS_UPDATED: {
        summary: 'Endereço atualizado',
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
    422: getValidationErrorResponse([ 'cep', 'estado' ]),
    404: getApplicationErrorResponse('Endereço não encontrado', [ { field: 'id', summary: 'Endereço inexistente.', message: `Endereço '${addressMock.id}' não encontrado.`  } ]),
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
    summary: 'Atualiar dados do endereço especificado do usuário informado no Bearer.',
    produces: 'application/json',
    security: [{ jwt: [] }],
    parameters: [ enderecoIdQuery ],
    responses,
    requestBody,
};
