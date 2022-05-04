import { faker } from "@faker-js/faker";
import { getApplicationErrorResponse, unAuthorizedErrorResponse } from "../../../contracts/Abstract.swagger";
import { documentation as documentationCadastrar } from "../Cadastrar/CadastrarUsuario.swagger";

// Arrange

const documentationAtualizar = JSON.parse(JSON.stringify(documentationCadastrar));

// Atualizar summary

documentationAtualizar.summary = 'Atualizar dados do usuário informado no Bearer.';

// Adicionar autenticação

documentationAtualizar.security = [{ jwt: [] }];

// Adicionar response codes

documentationAtualizar.responses[401] = unAuthorizedErrorResponse;
documentationAtualizar.responses[404] = getApplicationErrorResponse('Usuário não encontrado', [ { field: 'id', summary: 'ID do usuário inexistente.', message: `Usuário '${faker.datatype.number()}' não encontrado.`  } ]);
documentationAtualizar.responses[409] = getApplicationErrorResponse('Senha conflitante', [ { field: 'senha', summary: 'Senha não pode ser igual.', message: 'A nova senha não pode ser igual a antiga.'  } ]);

// Remover obrigatoriedade de senha

documentationAtualizar.requestBody.content['application/json'].schema.required = [];

// Documentation

export const documentation = documentationAtualizar;
