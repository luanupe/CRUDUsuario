import { injectable } from "tsyringe";
import { HealthcheckEntity } from "../../entities/Healthcheck/Healthcheck.entity";

@injectable()
export class HealthcheckUsecase {

    run = (): HealthcheckEntity => {
        const name = process.env.npm_package_name;
        const version = process.env.npm_package_version;
        const uptime = process.uptime();
        return { name, version, uptime };
    }

}
