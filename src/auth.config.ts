import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { isError } from './lib/utils/either';
import { provideLoginUsecase } from './features/user/login';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const loginUsecase = provideLoginUsecase();
				const response = await loginUsecase.execute({
					username: credentials.username as string,
					password: credentials.password as string,
				});

				if (isError(response)) {
					throw new Error(response.error);
				}

				return {
					name: response.success.data.username,
					role: response.success.data.role,
					id: response.success.data.id,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
