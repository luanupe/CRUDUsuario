import { CelebrateError } from 'celebrate';
import { Response } from 'express';
import { AbstractError } from "../contracts/Abstract.error";
import { ErrorMiddleware } from "./Error.middleware";

describe('Testando Error Middleware', () => {
    describe('Testando método handleApplicationError', () => {
        it('Deve chamar next quando não é error do tipo AbstractError', () => {
            // Arrange
            const error = new Error('Erro genérico');
            const next = jest.fn();

            // Act
            const sut = new ErrorMiddleware(null);
            sut._handleApplicationError(error, null, null, next);

            // Assert
            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        }, 5000);
        it('Deve enviar response se error for do tipo AbstractError', (done) => {
            // Arrange
            const message = 'Erro da aplicação';
            const error = new AbstractError(message, 401);

            const response = {
                status: (statusCode: number) => {
                    expect(statusCode).toBe(401);
                    return {
                        json: (data: any) => {
                            expect(data).toHaveProperty('details', 'AbstractError');
                            expect(data).toHaveProperty('message', message);
                            done();
                        },
                    };
                },
            } as Response;

            // Act
            const sut = new ErrorMiddleware(null);
            sut._handleApplicationError(error, null, response, null);
        }, 5000);
    });
    describe('Testando método handleJoiCelebrateError', () => {
        it('Deve chamar next quando não é error do Joi Celebrate', () => {
            // Arrange
            const error = new Error('Erro genérico');
            const next = jest.fn();

            // Act
            const sut = new ErrorMiddleware(null);
            sut._handleJoiCelebrateError(error, null, null, next);

            // Assert
            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        }, 5000);
        it('Deve enviar response se error for do Joi Celebrate', (done) => {
            // Arrange
            const message = 'Erro de validação';
            const error = new CelebrateError(message, { celebrated: true });

            const response = {
                status: (statusCode: number) => {
                    expect(statusCode).toBe(422);
                    return {
                        json: (data: any) => {
                            expect(data).toHaveProperty('details', {});
                            expect(data).toHaveProperty('message', message);
                            done();
                        },
                    };
                },
            } as Response;

            // Act
            const sut = new ErrorMiddleware(null);
            sut._handleJoiCelebrateError(error, null, response, null);
        }, 5000);
    });
    describe('Testando método handleDefaultError', () => {
        it('Deve enviar response se error for genérico', (done) => {
            // Arrange
            const message = 'Erro genérico';
            const error = new Error(message);

            const response = {
                status: (statusCode: number) => {
                    expect(statusCode).toBe(500);
                    return {
                        json: (data: any) => {
                            expect(data).toHaveProperty('message', message);
                            done();
                        },
                    };
                },
                json: (data: any) => {
                    expect(data).toHaveProperty('message', message);
                    done();
                },
            } as Response;

            // Act
            const sut = new ErrorMiddleware(null);
            sut._handleDefaultError(error, null, response, null);
        }, 5000);
    });
});