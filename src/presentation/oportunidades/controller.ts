import { Request, Response } from "express";
import {
    CreateOportunidad,
    CreateOportunidadDto,
    CustomError,
    DeleteOportunidad,
    GetOportunidad,
    GetOportunidades,
    OportunidadRepository,
    UpdateOportunidad,
    UpdateOportunidadDto,
} from "../../domain";

export class OportunidadesController {
    constructor(
        private readonly oportunidadRepository: OportunidadRepository,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    public getOportunidades = (req: Request, res: Response) => {
        new GetOportunidades(this.oportunidadRepository)
            .execute()
            .then(oportunidades => res.json(oportunidades))
            .catch(error => this.handleError(error, res));
    };

    public getOportunidadById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetOportunidad(this.oportunidadRepository)
            .execute(id)
            .then(oportunidad => res.json(oportunidad))
            .catch(error => this.handleError(error, res));
    };

    public createOportunidad = (req: Request, res: Response) => {
        const [error, createOportunidadDto] = CreateOportunidadDto.create({ ...req.body, userId: req.body.user.id });
        if (error) return res.status(400).json({ error });

        new CreateOportunidad(this.oportunidadRepository)
            .execute(createOportunidadDto!)
            .then(oportunidad => res.status(201).json(oportunidad))
            .catch(error => this.handleError(error, res));
    };

    public updateOportunidad = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateOportunidadDto] = UpdateOportunidadDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        new UpdateOportunidad(this.oportunidadRepository)
            .execute(updateOportunidadDto!)
            .then(oportunidad => res.json(oportunidad))
            .catch(error => this.handleError(error, res));
    };

    public deleteOportunidad = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteOportunidad(this.oportunidadRepository)
            .execute(id)
            .then(oportunidad => res.json(oportunidad))
            .catch(error => this.handleError(error, res));
    };
}
