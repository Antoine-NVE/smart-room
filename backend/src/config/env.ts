import { z } from 'zod';
import { fail, ok } from '../../core/utils/result.js';
import type { Result } from '../../core/types/result.js';

export const loadEnv = (): Result<z.infer<typeof schema>, unknown> => {
    const schema = z.object({
        nodeEnv: z.enum(['development', 'production']),
        allowedOrigins: z
            .string()
            .transform((value) => value.split(','))
            .pipe(z.array(z.url())),
        postgresUrl: z.url(),
        port: z.coerce.number(),
    });

    try {
        return ok(
            schema.parse({
                nodeEnv: process.env.NODE_ENV,
                allowedOrigins: process.env.ALLOWED_ORIGINS,
                postgresUrl: process.env.POSTGRES_URL,
                port: process.env.PORT,
            }),
        );
    } catch (err: unknown) {
        return fail(err);
    }
};
