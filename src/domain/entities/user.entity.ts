import { CustomError } from '../errors/custom.error';

export class UserEntity {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: 'ADMIN' | 'VENDEDOR',
        public isActive: boolean,
        public createdAt: Date,
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const { id, name, email, password, role, isActive, createdAt } = object;
        if (!id) throw CustomError.badRequest('Id is required');

        return new UserEntity(id, name, email, password, role, isActive, createdAt);
    }
}
