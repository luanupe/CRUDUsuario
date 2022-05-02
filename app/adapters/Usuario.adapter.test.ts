import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { Usuario } from "../models/Usuario.model";
import { UsuarioEntity } from "../entities/Usuario.entity";
import { mapUsuario } from "./Usuario.adapter";

describe('Testando Usuario Adapter', () => {
    it('Deve mapear campos com sucesso', () => {
        // Arrange
        const usuario: Usuario = {
            id: faker.datatype.number(),
            nome: faker.name.findName(),
            email: faker.internet.email(),
            senha: bcrypt.hashSync(faker.internet.password()),
            cpf: faker.phone.phoneNumber('###########'),
            telefone: faker.phone.phoneNumber('############'),
            comunicacoes: faker.datatype.boolean(),
            criadoEm: faker.datatype.datetime(),
        };

        // Act
        const result: UsuarioEntity = mapUsuario(usuario);

        // Assert
        expect(result).toBeTruthy();
        expect(result).not.toHaveProperty('senha');
        expect(result).toHaveProperty('id', usuario.id);
        expect(result).toHaveProperty('nome', usuario.nome);
        expect(result).toHaveProperty('email', usuario.email);
        expect(result).toHaveProperty('cpf', usuario.cpf);
        expect(result).toHaveProperty('telefone', usuario.telefone);
        expect(result).toHaveProperty('comunicacoes', usuario.comunicacoes);
    });
});