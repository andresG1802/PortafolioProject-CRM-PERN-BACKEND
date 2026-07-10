import { CreateOportunidadDto, OportunidadDataSource, OportunidadEntity, OportunidadRepository, UpdateOportunidadDto } from "../../domain";

export class OportunidadRepositoryImpl implements OportunidadRepository {
    constructor(
        private readonly datasource: OportunidadDataSource,
    ) {}
    create(createOportunidadDto: CreateOportunidadDto): Promise<OportunidadEntity> {
        return this.datasource.create(createOportunidadDto);
    }
    getAll(): Promise<OportunidadEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<OportunidadEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateOportunidadDto: UpdateOportunidadDto): Promise<OportunidadEntity> {
        return this.datasource.updateById(updateOportunidadDto);
    }
    deleteById(id: number): Promise<OportunidadEntity> {
        return this.datasource.deleteById(id);
    }
}
