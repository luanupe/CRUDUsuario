import { injectable } from "tsyringe";
import { HealthcheckEntity } from "../../entities/Healthcheck.entity";

@injectable()
export class HealthcheckUsecase {

    run = (): HealthcheckEntity => {
        const name = process.env.npm_package_name;
        const version = process.env.npm_package_version;
        const uptime = process.uptime();
        return { aplicacao: name, versao: version, uptime };
    }

}
