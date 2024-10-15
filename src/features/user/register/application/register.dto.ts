import { z } from 'zod';

export const registerDto = z.object({
	username: z.string(),
	password: z.string(),
	email: z.string().email(),
});

export type RegisterDto = z.infer<typeof registerDto>;
