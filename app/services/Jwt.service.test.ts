import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { JwtService } from "./Jwt.service";
import { JwtEntity } from "../entities/Jwt.entity";

describe('Testando Jwt Service', () => {
    it ('Deve gerar token JWT com sucesso', () => {
        // Arrange
        const data: JwtEntity = {
            id: faker.datatype.number(),
            email: faker.internet.email(),
        };

        // Act
        const sut = new JwtService();
        const result = sut.assinar(data);
        console.log(result);

        // Assert
        expect(result).toBeTruthy();
        expect(result).toMatch(/^(?:[\w-]*\.){2}[\w-]*$/); // Créditos: https://stackoverflow.com/questions/61802832/regex-to-match-jwt
    });
    it ('Deve validar token JWT com sucesso', () => {
        // Arrange
        const data: JwtEntity = {
            id: faker.datatype.number(),
            email: faker.internet.email(),
        };

        // Act
        const sut = new JwtService();
        const token = sut.assinar(data);
        const result = sut.validar(token);

        // Assert
        expect(result).toBeTruthy();
        expect(result).toHaveProperty('id', data.id);
        expect(result).toHaveProperty('email', data.email);
    });
});
