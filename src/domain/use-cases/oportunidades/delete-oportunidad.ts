import { OportunidadEntity } from "../../entities/oportunidad.entity";
import { OportunidadRepository } from "../../repositories/oportunidad.repository";

export interface DeleteOportunidadUseCase {
    execute(id: number): Promise<OportunidadEntity>;
}

export class DeleteOportunidad implements DeleteOportunidadUseCase {
    constructor(
        private readonly repository: OportunidadRepository,
    ) {}
    execute(id: number): Promise<OportunidadEntity> {
        return this.repository.deleteById(id);
    }
}
