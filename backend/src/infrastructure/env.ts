import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    ALLOWED_ORIGINS: z.array(z.url()),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = () => {
    const { NODE_ENV, ALLOWED_ORIGINS, DB_USER, DB_PASSWORD } = process.env;

    return envSchema.parse({
        NODE_ENV,
        ALLOWED_ORIGINS: ALLOWED_ORIGINS?.split(','),
        DB_USER,
        DB_PASSWORD,
    });
};
