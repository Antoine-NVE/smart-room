import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    ALLOWED_ORIGINS: z.array(z.url()),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = () => {
    return envSchema.parse({
        NODE_ENV: process.env.NODE_ENV,
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(','),
    });
};
