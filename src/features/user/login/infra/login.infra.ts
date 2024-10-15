import { User } from '@prisma/client';
import { UserClient } from '~/lib/prisma/clients/user/user.client';

export interface ILoginInfra {
	getUserByUsername(username: string): Promise<User | null>;
}

export class LoginInfra implements ILoginInfra {
	constructor(private readonly client: UserClient) {}

	async getUserByUsername(username: string): Promise<User | null> {
		try {
			return await this.client.getUserByUsername(username);
		} catch {
			throw new Error('Infra error getting user by username');
		}
	}
}
