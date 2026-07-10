import { CreateOportunidadDto } from "../../dtos";
import { OportunidadEntity } from "../../entities/oportunidad.entity";
import { OportunidadRepository } from "../../repositories/oportunidad.repository";

export interface CreateOportunidadUseCase {
    execute(dto: CreateOportunidadDto): Promise<OportunidadEntity>;
}

export class CreateOportunidad implements CreateOportunidadUseCase {
    constructor(
        private readonly repository: OportunidadRepository,
    ) {}
    execute(dto: CreateOportunidadDto): Promise<OportunidadEntity> {
        return this.repository.create(dto);
    }
}
