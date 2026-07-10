import jwt from 'jsonwebtoken';
import { envs } from './envs';

export interface JwtPayload {
    id: number;
    role: string;
}

export class JwtAdapter {
    static generateToken(payload: JwtPayload, duration: jwt.SignOptions['expiresIn'] = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        });
    }

    static validateToken<T = JwtPayload>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}
