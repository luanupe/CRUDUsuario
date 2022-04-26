import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { AbstractController } from "../../contracts/Abstract.controller";
import { HealthcheckUsecase } from "../../usecases/Healthcheck/Healthcheck.usecase";

@injectable()
export class HealthcheckController extends AbstractController {

    constructor(
        @inject('HealthcheckUsecase')
        private healthcheckUsecase: HealthcheckUsecase,
    ) {
        super();
    }

    handle = (_request: Request, response: Response, next: NextFunction) => {
        try {
            // Act
            const result = this.healthcheckUsecase.run();

            // Response
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }

}
