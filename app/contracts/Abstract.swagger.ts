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

export const getApplicationErrorResponse = (fields: string[]) => {
    const examples = {};

    // Montar exemplos
    fields.forEach((field: string) => {
        const name = field.charAt(0).toUpperCase() + field.slice(1);
        examples[name] = {
            summary: `Erro da aplicação ao validar ${field}`,
            value: { message: `Não foi possível confirmar o ${field}`, details: `${name}Error` },
        };
    });

    // Montar response
    return {
        description: 'Erro interno da aplicação',
        content: {
            'application/json': {
                schema: applicationErrorSchema,
                examples,
            }
        },
    };
};
