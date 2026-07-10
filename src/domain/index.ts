export * from './errors/custom.error';

export * from './entities/user.entity';
export * from './entities/cliente.entity';
export * from './entities/contacto.entity';
export * from './entities/oportunidad.entity';
export * from './entities/tarea.entity';
export * from './entities/nota.entity';

export * from './dtos';

export * from './datasources/auth.datasource';
export * from './datasources/cliente.datasource';
export * from './datasources/contacto.datasource';
export * from './datasources/oportunidad.datasource';
export * from './datasources/tarea.datasource';
export * from './datasources/nota.datasource';

export * from './repositories/auth.repository';
export * from './repositories/cliente.repository';
export * from './repositories/contacto.repository';
export * from './repositories/oportunidad.repository';
export * from './repositories/tarea.repository';
export * from './repositories/nota.repository';

export * from './use-cases/auth/register-user';
export * from './use-cases/auth/login-user';

export * from './use-cases/clientes/create-cliente';
export * from './use-cases/clientes/get-clientes';
export * from './use-cases/clientes/get-cliente';
export * from './use-cases/clientes/update-cliente';
export * from './use-cases/clientes/delete-cliente';

export * from './use-cases/contactos/create-contacto';
export * from './use-cases/contactos/get-contactos';
export * from './use-cases/contactos/update-contacto';
export * from './use-cases/contactos/delete-contacto';

export * from './use-cases/oportunidades/create-oportunidad';
export * from './use-cases/oportunidades/get-oportunidades';
export * from './use-cases/oportunidades/get-oportunidad';
export * from './use-cases/oportunidades/update-oportunidad';
export * from './use-cases/oportunidades/delete-oportunidad';

export * from './use-cases/tareas/create-tarea';
export * from './use-cases/tareas/get-tareas';
export * from './use-cases/tareas/get-tarea';
export * from './use-cases/tareas/update-tarea';
export * from './use-cases/tareas/delete-tarea';

export * from './use-cases/notas/create-nota';
export * from './use-cases/notas/get-notas';
export * from './use-cases/notas/delete-nota';
