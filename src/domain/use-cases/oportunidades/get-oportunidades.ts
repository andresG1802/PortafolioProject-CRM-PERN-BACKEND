import { OportunidadEntity } from "../../entities/oportunidad.entity";
import { OportunidadRepository } from "../../repositories/oportunidad.repository";

export interface GetOportunidadesUseCase {
    execute(): Promise<OportunidadEntity[]>;
}

export class GetOportunidades implements GetOportunidadesUseCase {
    constructor(
        private readonly repository: OportunidadRepository,
    ) {}
    execute(): Promise<OportunidadEntity[]> {
        return this.repository.getAll();
    }
}
