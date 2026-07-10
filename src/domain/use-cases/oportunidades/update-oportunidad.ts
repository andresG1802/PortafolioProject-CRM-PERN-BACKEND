import { UpdateOportunidadDto } from "../../dtos";
import { OportunidadEntity } from "../../entities/oportunidad.entity";
import { OportunidadRepository } from "../../repositories/oportunidad.repository";

export interface UpdateOportunidadUseCase {
    execute(dto: UpdateOportunidadDto): Promise<OportunidadEntity>;
}

export class UpdateOportunidad implements UpdateOportunidadUseCase {
    constructor(
        private readonly repository: OportunidadRepository,
    ) {}
    execute(dto: UpdateOportunidadDto): Promise<OportunidadEntity> {
        return this.repository.updateById(dto);
    }
}
