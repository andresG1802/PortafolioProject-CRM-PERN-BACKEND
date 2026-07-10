-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VENDEDOR');

-- CreateEnum
CREATE TYPE "EstadoCliente" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "EtapaOportunidad" AS ENUM ('NUEVO', 'CONTACTADO', 'PROPUESTA', 'NEGOCIACION', 'GANADA', 'PERDIDA');

-- CreateEnum
CREATE TYPE "TipoTarea" AS ENUM ('LLAMADA', 'REUNION', 'EMAIL', 'OTRO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VENDEDOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "empresa" VARCHAR(150),
    "email" VARCHAR(150),
    "telefono" VARCHAR(30),
    "direccion" VARCHAR(200),
    "estado" "EstadoCliente" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "cargo" VARCHAR(100),
    "email" VARCHAR(150),
    "telefono" VARCHAR(30),
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oportunidad" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,
    "monto" DECIMAL(12,2) NOT NULL,
    "etapa" "EtapaOportunidad" NOT NULL DEFAULT 'NUEVO',
    "fechaCierreEstimada" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Oportunidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,
    "tipo" "TipoTarea" NOT NULL DEFAULT 'OTRO',
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER,
    "oportunidadId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" INTEGER,
    "oportunidadId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oportunidad" ADD CONSTRAINT "Oportunidad_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oportunidad" ADD CONSTRAINT "Oportunidad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_oportunidadId_fkey" FOREIGN KEY ("oportunidadId") REFERENCES "Oportunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_oportunidadId_fkey" FOREIGN KEY ("oportunidadId") REFERENCES "Oportunidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
