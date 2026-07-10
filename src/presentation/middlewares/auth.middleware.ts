import { NextFunction, Request, Response } from "express";
import { JwtAdapter, JwtPayload } from "../../config/jwt.adapter";
import { prisma } from "../../data/postgres";

export class AuthMiddleware {
    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) ?? '';

        try {
            const payload = await JwtAdapter.validateToken<JwtPayload>(token);
            if (!payload) return res.status(401).json({ error: 'Invalid token' });

            const user = await prisma.user.findUnique({ where: { id: payload.id } });
            if (!user) return res.status(401).json({ error: 'Invalid token - user not found' });
            if (!user.isActive) return res.status(401).json({ error: 'User is inactive' });

            req.body.user = { id: user.id, name: user.name, email: user.email, role: user.role };

            next();
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    static checkRole = (...roles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.body.user;
            if (!user) return res.status(401).json({ error: 'No token provided' });
            if (!roles.includes(user.role)) return res.status(403).json({ error: 'Forbidden - insufficient permissions' });

            next();
        };
    };
}
