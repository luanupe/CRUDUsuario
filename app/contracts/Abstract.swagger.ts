type ApplicationErrorType = {
    field: string;
    summary: string;
    message: string;
};

const getApplicationErrorExamples = (data: ApplicationErrorType[]) => {
    const examples = {};

    data.forEach((input: ApplicationErrorType) => {
        const name = input.field.charAt(0).toUpperCase() + input.field.slice(1);
        const example = { summary: input.summary, value: { message: input.message, details: `${name}Error` } };
        examples[input.field] = example;
    });

    return examples;
};

// Response: unAuthorized error

const unAuthorizedErrorSchema = {
    type: 'object',
    required: [ 'message', 'details' ],
    properties: {
        message: { type: 'string' },
        details: { type: 'object' },
    },
};

const unAuthorizedErrorExamples = {
    MISSING_COOKIE: {
        summary: 'Cookie "authorization" ausente',
        value: {
            message: 'Token de autorização não informado.',
            details: { }
        },
    },
    INVALID_COOKIE: {
        summary: 'Cookie "authorization" inválido',
        value: {
            message: 'Cookie de autorização mal formatado.',
            details: { }
        },
    },
    INVALID_METHOD: {
        summary: 'Método de autenticação do Cookie "authorization" inválido',
        value: {
            message: 'Método de autenticação Basic não autorizado.',
            details: { }
        },
    },
};

// Response: Generic Error

export const genericErrorSchema = {
    type: 'object',
    required: [ 'message', 'details' ],
    properties: {
        message: { type: 'string' },
        details: { type: 'object' },
    },
};

export const genericErrorExamples = {
    APPLICATION_ERROR: {
        summary: 'Erro genérico da aplicação',
        value: {
            message: 'Mensagem de erro',
            details: { }
        },
    },
};

// Response: Validation error

const validationErrorSchema = {
    type: 'object',
    required: [ 'message', 'details' ],
    properties: {
        message: { type: 'string' },
        details: {
            type: 'object',
            properties: {
                type: 'array',
                items: { type: 'string' },
            },
        },
    },
};

// Response: Application error

const applicationErrorSchema = {
    type: 'object',
    required: [ 'message', 'details' ],
    properties: {
        message: { type: 'string' },
        details: { type: 'string' },
    },
};

// Responses

export const unAuthorizedErrorResponse = {
    description: 'Erro genérico da aplicação',
    content: {
        'application/json': {
            schema: unAuthorizedErrorSchema,
            examples: unAuthorizedErrorExamples,
        }
    },
};

export const genericErrorResponse = {
    description: 'Erro genérico da aplicação',
    content: {
        'application/json': {
            schema: genericErrorSchema,
            examples: genericErrorExamples,
        }
    },
};

export const getValidationErrorResponse = (fields: string[]) => {
    const examples = {};

    // Montar exemplos
    fields.forEach((field: string) => {
        const details = {};
        details[field] = [ `"${field}" contains an invalid value` ];
        const name = field.charAt(0).toUpperCase() + field.slice(1);
        examples[field] = {
            summary: `${name} inserido é inválido`,
            value: { message: 'Validation failed', details },
        };
    });

    // Montar response
    return {
        description: 'Falha durante a validação de dados',
        content: {
            'application/json': {
                schema: validationErrorSchema,
                examples,
            }
        },
    };
};

export const getApplicationErrorResponse = (description: string, data: ApplicationErrorType[]) => {
    return {
        description: description,
        content: {
            'application/json': {
                schema: applicationErrorSchema,
                examples: getApplicationErrorExamples(data),
            }
        },
    };
};

export const getGenericFieldsApplicationErrorResponse = (fields: string[]) => {
    const data: ApplicationErrorType[] = [];

    // Montar exemplos
    fields.forEach((field: string) => {
        const summary = `Erro da aplicação ao validar ${field}`;
        const message = `Não foi possível confirmar o ${field}`;
        data.push({ field, summary, message });
    });

    // Response
    return getApplicationErrorResponse('Erro interno da aplicação', data);
};
