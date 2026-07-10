import { OportunidadEntity } from "../../entities/oportunidad.entity";
import { OportunidadRepository } from "../../repositories/oportunidad.repository";

export interface GetOportunidadUseCase {
    execute(id: number): Promise<OportunidadEntity>;
}

export class GetOportunidad implements GetOportunidadUseCase {
    constructor(
        private readonly repository: OportunidadRepository,
    ) {}
    execute(id: number): Promise<OportunidadEntity> {
        return this.repository.findById(id);
    }
}
