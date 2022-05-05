import { faker } from "@faker-js/faker";
import { genericErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";
import { addressRequired, addressSchema, addressMock } from "../Visualizar/VisualizarEndereco.swagger";

// Mocks

const addressesSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {...addressSchema},
        required: [...addressRequired],
    },
};

const addressesMock = [ addressMock, addressMock ];

// Response: Success

const successSchema = {
    type: 'object',
    properties: { ...addressesSchema },
};

const successExamples = {
    ADDRESSES_LISTED: {
        summary: 'Endereços listados',
        value: {...addressesMock},
    },
};

// Responses

const responses = {
    200: {
        description: 'Endereços listados com sucesso',
        content: {
            'application/json': {
                schema: successSchema,
                examples: successExamples,
            }
        },
    },
    401: unAuthorizedErrorResponse,
    500: genericErrorResponse,
};

// Query

const cidadeQuery = {
    name: 'cidade',
    description: 'cidade do endereço',
    required: false,
    type: 'string',
    in: 'query',
    example: faker.address.cityName(),
};

// Documentation

export const documentation = {
    tags: ['Endereço'],
    summary: 'Listar endereços do usuário informado no Bearer.',
    produces: 'application/json',
    security: [{ jwt: [] }],
    parameters: [ cidadeQuery ],
    responses,
};
