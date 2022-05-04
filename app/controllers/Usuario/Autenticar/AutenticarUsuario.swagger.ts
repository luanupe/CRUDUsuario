import { faker } from "@faker-js/faker";
import { userSchema, userRequired, userMock } from "../Cadastrar/CadastrarUsuario.swagger";
import { genericErrorResponse, getValidationErrorResponse, getApplicationErrorResponse } from "../../../contracts/Abstract.swagger";

// Response: Success

const successSchema = {
    type: 'object',
    required: [ 'usuario', 'bearer' ],
    properties: {
        bearer: { type: 'string' },
        usuario: {
            type: 'object',
            required: [ ...userRequired ],
            properties: { ...userSchema },
        },
    },
};

const successExamples = {
    AUTHENTICATION_SUCCESS: {
        summary: 'Usuário autenticado',
        value: { usuario: {...userMock}, bearer: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4MTIsImVtYWlsIjoiUmljb19MZWZmbGVyQGdtYWlsLmNvbSIsImlhdCI6MTY1MTU4MTUxNywiZXhwIjoxNjUxNTgyMTE3LCJhdWQiOiJodHRwOi8vbG9jYWxob3N0IiwiaXNzIjoiVXNlciBDUlVEIFRlc3RpbmcifQ.Y7lxEA8tDlDzjJ-kmAvLX3lXdS8lyKizNQ5yytw1ybSlJVeRCk-HkAfgUd0OBuMajsuzCMmMFYM0LDhQXc213tBMjvId1k8JWJTS8ypd1yfoo558PxFGuADYgONW0natb60ED7mSNcc4H8foS8B_8-XvhtmgGRPAyvP2Y2RATbbsIMNH6R1o91cg2YCh7Mn7f5T0DnjV1RNuPpRJhNxGhjvC4Y6YjyiA6Sv_IM5-KDDwgJ-NBhYoeJlxwyv4MgCS2yJ6-nXaLs2X9NXyozDozxMSnblKRxDUWRn-LQuF7uSJXHCPaBJB04JbDFwbGKoqTnRz_xv1L1Xlof1PMLhyFA' },
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
    403: getApplicationErrorResponse('Falha na autenticação', [ { field: 'email', summary: 'Credenciais inválidas.', message: 'Não foi possível autenticar o usuário, verifique os dados e tente novamente' } ]),
    422: getValidationErrorResponse([ 'email', 'senha' ]),
    500: genericErrorResponse,
};

// Body

const userBodyRequired = [ 'email', 'senha' ];

const userBodySchema = {
    email: { type: 'string' },
    senha: { type: 'string' },
};

const userBodyMock = {
    email: faker.internet.email(),
    senha: faker.internet.password(),
};

const requestBodySchema = {
    type: 'object',
    properties: { ...userBodySchema },
    required: [ ...userBodyRequired ],
};

const requestBodyExamples = {
    AUTENTICAR_CONTA: {
        summary: 'Autenticar credenciais do usuário',
        value: { ...userBodyMock },
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
    summary: 'Autenticar um usuário.',
    produces: 'application/json',
    requestBody,
    responses,
};
