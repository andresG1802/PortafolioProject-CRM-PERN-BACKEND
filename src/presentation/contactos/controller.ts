import { Request, Response } from "express";
import {
    ContactoRepository,
    CreateContacto,
    CreateContactoDto,
    CustomError,
    DeleteContacto,
    GetContactos,
    UpdateContacto,
    UpdateContactoDto,
} from "../../domain";

export class ContactosController {
    constructor(
        private readonly contactoRepository: ContactoRepository,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

    public getContactosByCliente = (req: Request, res: Response) => {
        const clienteId = +req.params.clienteId;

        new GetContactos(this.contactoRepository)
            .execute(clienteId)
            .then(contactos => res.json(contactos))
            .catch(error => this.handleError(error, res));
    };

    public createContacto = (req: Request, res: Response) => {
        const [error, createContactoDto] = CreateContactoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateContacto(this.contactoRepository)
            .execute(createContactoDto!)
            .then(contacto => res.status(201).json(contacto))
            .catch(error => this.handleError(error, res));
    };

    public updateContacto = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateContactoDto] = UpdateContactoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        new UpdateContacto(this.contactoRepository)
            .execute(updateContactoDto!)
            .then(contacto => res.json(contacto))
            .catch(error => this.handleError(error, res));
    };

    public deleteContacto = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteContacto(this.contactoRepository)
            .execute(id)
            .then(contacto => res.json(contacto))
            .catch(error => this.handleError(error, res));
    };
}
