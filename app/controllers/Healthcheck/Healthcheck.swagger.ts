const successSchema = {
    type: 'object',
    properties: {
        aplicacao: { type: 'string' },
        versao: { type: 'string' },
        uptime: { type: 'float' },
    },
};

const successExamples = {
    HEALTHCHECK_SUCCESS: {
        summary: 'Saúde OK',
        value: {
            aplicacao: 'user-address-crud',
            versao: '1.0.0',
            uptime: 22.521048626,
        },
    },
};

const responses = {
    200: {
        description: 'Saúde do servidor consultada com sucesso',
        content: {
            'application/json': {
                schema: successSchema,
                examples: successExamples,
            }
        },
    },
};

export const documentation = {
    tags: ['Saúde'],
    summary: 'Consultar saúde da api.',
    produces: 'application/json',
    responses,
};
