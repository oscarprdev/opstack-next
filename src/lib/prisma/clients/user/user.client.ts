import { CreateUserPayload } from '~/features/user/register/shared/types';
import prisma from '../../db';
import { User } from '@prisma/client';

interface IUserClient {
	getUserByUsername(id: string): Promise<User | null>;
	getUserByCredentials(username: string, password: string): Promise<User | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
}

export class UserClient implements IUserClient {
	constructor() {}

	async getUserByUsername(username: string) {
		return await prisma.user.findUnique({
			where: {
				username,
			},
		});
	}

	async getUserByCredentials(username: string, password: string) {
		return await prisma.user.findUnique({
			where: {
				username,
				password,
			},
		});
	}

	async createUser(payload: CreateUserPayload) {
		await prisma.user.create({
			data: {
				username: payload.username,
				email: payload.email,
				password: payload.password,
				role: payload.role,
			},
		});
	}
}
