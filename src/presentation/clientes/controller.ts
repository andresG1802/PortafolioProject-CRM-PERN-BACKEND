import { Request, Response } from "express";
import {
    ClienteRepository,
    CreateCliente,
    CreateClienteDto,
    CustomError,
    DeleteCliente,
    GetCliente,
    GetClientes,
    UpdateCliente,
    UpdateClienteDto,
} from "../../domain";

export class ClientesController {
    constructor(
        private readonly clienteRepository: ClienteRepository,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    public getClientes = (req: Request, res: Response) => {
        new GetClientes(this.clienteRepository)
            .execute()
            .then(clientes => res.json(clientes))
            .catch(error => this.handleError(error, res));
    };

    public getClienteById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetCliente(this.clienteRepository)
            .execute(id)
            .then(cliente => res.json(cliente))
            .catch(error => this.handleError(error, res));
    };

    public createCliente = (req: Request, res: Response) => {
        const [error, createClienteDto] = CreateClienteDto.create({ ...req.body, userId: req.body.user.id });
        if (error) return res.status(400).json({ error });

        new CreateCliente(this.clienteRepository)
            .execute(createClienteDto!)
            .then(cliente => res.status(201).json(cliente))
            .catch(error => this.handleError(error, res));
    };

    public updateCliente = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateClienteDto] = UpdateClienteDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        new UpdateCliente(this.clienteRepository)
            .execute(updateClienteDto!)
            .then(cliente => res.json(cliente))
            .catch(error => this.handleError(error, res));
    };

    public deleteCliente = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteCliente(this.clienteRepository)
            .execute(id)
            .then(cliente => res.json(cliente))
            .catch(error => this.handleError(error, res));
    };
}
