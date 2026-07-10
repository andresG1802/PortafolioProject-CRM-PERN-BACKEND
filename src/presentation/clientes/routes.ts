import { Router } from "express";
import { ClienteDatasourceImpl } from "../../infrastructure/datasource/cliente.datasource.impl";
import { ClienteRepositoryImpl } from "../../infrastructure/repositories/cliente.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ClientesController } from "./controller";

export class ClienteRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ClienteDatasourceImpl();
        const clienteRepository = new ClienteRepositoryImpl(datasource);
        const controller = new ClientesController(clienteRepository);

        router.use(AuthMiddleware.validateJWT);

        router.get('/', controller.getClientes);
        router.get('/:id', controller.getClienteById);
        router.post('/', controller.createCliente);
        router.put('/:id', controller.updateCliente);
        router.delete('/:id', AuthMiddleware.checkRole('ADMIN'), controller.deleteCliente);

        return router;
    }
}
