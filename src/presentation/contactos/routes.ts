import { Router } from "express";
import { ContactoDatasourceImpl } from "../../infrastructure/datasource/contacto.datasource.impl";
import { ContactoRepositoryImpl } from "../../infrastructure/repositories/contacto.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ContactosController } from "./controller";

export class ContactoRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ContactoDatasourceImpl();
        const contactoRepository = new ContactoRepositoryImpl(datasource);
        const controller = new ContactosController(contactoRepository);

        router.use(AuthMiddleware.validateJWT);

        router.get('/cliente/:clienteId', controller.getContactosByCliente);
        router.post('/', controller.createContacto);
        router.put('/:id', controller.updateContacto);
        router.delete('/:id', controller.deleteContacto);

        return router;
    }
}
