import "reflect-metadata";
import faker from "@faker-js/faker";
import { Request } from 'express';
import { JwtEntity } from "../entities/Jwt.entity";
import { CookieNaoInformadoError } from "../errors/Jwt/CookieNaoInformado.error";
import { CookieInvalidoError } from "../errors/Jwt/CookieInvalido.error";
import { TipoInvalidoError } from "../errors/Jwt/TipoInvalido.error";
import { JwtService } from "../services/Jwt.service";
import { JwtMiddleware } from "./Jwt.middleware";

jest.mock('../services/Jwt.service', () => {
    return {
        JwtService: jest.fn().mockImplementation(() => {
            return {
                assinar: jest.fn(),
                validar: jest.fn(),
            };
        }),
    };
});

const jwtService = new JwtService();

describe('Testando Jwt Middleware', () => {
    it('Deve chamar next se o "authorization" for válido', () => {
        // Arrange
        const bearer = 'TokenValido';

        const user: JwtEntity = {
            id: faker.datatype.number(),
            email: faker.internet.email(),
        };

        const request: Request = {
            headers: {
                authorization: `Bearer ${bearer}`,
            },
        } as any as Request;

        const next = jest.fn();

        // Spy
        const validarSpy = jest.spyOn(jwtService, 'validar');

        // Mock
        validarSpy.mockReturnValueOnce(user);

        // Act
        const sut = new JwtMiddleware(jwtService);
        sut.validate(request, null, next)

        // Assert
        expect(validarSpy).toHaveBeenCalledTimes(1);
        expect(validarSpy).toHaveBeenCalledWith(bearer);
        expect(next).toHaveBeenCalledTimes(1);
        expect(request).toHaveProperty('usuario', user);
    });
    it('Deve lançar "CookieNaoInformadoError" caso o campo "authorization" não esteja presente no header', () => {
        // Arrange
        const request: Request = {
            headers: {},
        } as any as Request;

        // Act
        const sut = new JwtMiddleware(jwtService);

        // Assert
        expect(() => sut.validate(request, null, null)).toThrow(CookieNaoInformadoError);
    });
    it('Deve lançar "CookieInvalidoError" caso o campo "authorization" esteja mal formatado', () => {
        // Arrange
        const request: Request = {
            headers: {
                authorization: 'Bearer Alguma String Qualquer',
            },
        } as any as Request;

        // Act
        const sut = new JwtMiddleware(jwtService);

        // Assert
        expect(() => sut.validate(request, null, null)).toThrow(CookieInvalidoError);
    });
    it('Deve lançar "TipoInvalidoError" caso o tipo de "authorization" não seja "Bearer"', () => {
        // Arrange
        const request: Request = {
            headers: {
                authorization: 'Basic AlgumTokenBasic',
            },
        } as any as Request;

        // Act
        const sut = new JwtMiddleware(jwtService);

        // Assert
        expect(() => sut.validate(request, null, null)).toThrow(TipoInvalidoError);
    });
});
