import { User } from '@prisma/client';
import { RegisterPort } from '~/features/user/register/application/register.port';
import { RegisterInfra } from '~/features/user/register/infra/register.infra';
import { CreateUserPayload } from '~/features/user/register/shared/types';

export class RegisterRepository implements RegisterPort {
	constructor(private readonly infra: RegisterInfra) {}

	async getUserByCredentials(username: string, password: string): Promise<User | null> {
		return await this.infra.getUserByCredentials(username, password);
	}

	async createUser({ username, password, email, role }: CreateUserPayload): Promise<void> {
		await this.infra.createUser({ username, password, email, role });
	}
}
