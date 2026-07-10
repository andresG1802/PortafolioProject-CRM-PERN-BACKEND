import { CreateOportunidadDto, UpdateOportunidadDto } from "../dtos";
import { OportunidadEntity } from "../entities/oportunidad.entity";

export abstract class OportunidadRepository {
    abstract create(createOportunidadDto: CreateOportunidadDto): Promise<OportunidadEntity>;
    abstract getAll(): Promise<OportunidadEntity[]>;
    abstract findById(id: number): Promise<OportunidadEntity>;
    abstract updateById(updateOportunidadDto: UpdateOportunidadDto): Promise<OportunidadEntity>;
    abstract deleteById(id: number): Promise<OportunidadEntity>;
}
