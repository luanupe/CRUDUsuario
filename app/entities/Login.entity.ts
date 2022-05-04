import { UsuarioEntity } from "./Usuario.entity";

export type LoginEntity = {
    usuario: UsuarioEntity;
    bearer: string;
};
