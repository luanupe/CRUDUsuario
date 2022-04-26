import { Request, Response, NextFunction } from 'express';
import { AbstractController } from "../../contracts/Abstract.controller";
import HealthcheckUsecase from "../../usecases/Healthcheck/Healthcheck.usecase";

export class HealthcheckController extends AbstractController {

    async handle(_request: Request, response: Response, next: NextFunction) {
        try {
            // Arrange
            const useCase = new HealthcheckUsecase();
    
            // Act
            const result = useCase.run();

            // Response
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
