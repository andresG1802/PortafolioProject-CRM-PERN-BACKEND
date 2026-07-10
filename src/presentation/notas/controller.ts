import { Request, Response } from "express";
import { CreateNota, CreateNotaDto, CustomError, DeleteNota, GetNotas, NotaRepository } from "../../domain";

export class NotasController {
    constructor(
        private readonly notaRepository: NotaRepository,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    public getNotas = (req: Request, res: Response) => {
        new GetNotas(this.notaRepository)
            .execute()
            .then(notas => res.json(notas))
            .catch(error => this.handleError(error, res));
    };

    public createNota = (req: Request, res: Response) => {
        const [error, createNotaDto] = CreateNotaDto.create({ ...req.body, userId: req.body.user.id });
        if (error) return res.status(400).json({ error });

        new CreateNota(this.notaRepository)
            .execute(createNotaDto!)
            .then(nota => res.status(201).json(nota))
            .catch(error => this.handleError(error, res));
    };

    public deleteNota = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteNota(this.notaRepository)
            .execute(id)
            .then(nota => res.json(nota))
            .catch(error => this.handleError(error, res));
    };
}
