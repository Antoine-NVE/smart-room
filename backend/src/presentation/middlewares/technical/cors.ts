import cors from 'cors';
import { Env } from '../../../infrastructure/env';

export const createCors = (allowedOrigins: Env['ALLOWED_ORIGINS']) => {
    return cors({
        origin: allowedOrigins,
        credentials: true,
    });
};
