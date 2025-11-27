import cors from 'cors';
import { Env } from '../../../infrastructure/env';

export const createCorsMiddleware = (
    allowedOrigins: Env['ALLOWED_ORIGINS'],
) => {
    return cors({
        origin: allowedOrigins,
        credentials: true,
    });
};
