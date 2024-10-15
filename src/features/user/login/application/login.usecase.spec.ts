import { LoginPort } from './login.port';
import { LoginUsecase } from './login.usecase';
import bcrypt from 'bcryptjs';
import { type MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { UserModel } from '~/features/shared/models/user.model';
import { isError } from '~/lib/utils/either';

class LoginUsecaseMock implements LoginPort {
	constructor() {}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async getUserByUsername(_: string): Promise<UserModel | null> {
		return null;
	}
}

describe('Login usecase', () => {
	let usecase: LoginUsecase;
	let port: LoginUsecaseMock;
	let spyGetUserByUsername: MockInstance;
	let spyBcryptCompare: MockInstance;
	let mockUser: UserModel;

	beforeEach(() => {
		port = new LoginUsecaseMock();
		usecase = new LoginUsecase(port, bcrypt);
		spyGetUserByUsername = vi.spyOn(port, 'getUserByUsername');
		spyBcryptCompare = vi.spyOn(bcrypt, 'compare');
		mockUser = {
			username: 'testUser',
			email: 'test@example.com',
			id: '1',
			description: 'Test User',
			role: 'USER',
			password: 'hashedPassword',
		};
	});

	it('should return success response', async () => {
		spyBcryptCompare.mockImplementationOnce(() => Promise.resolve(true));
		spyGetUserByUsername.mockImplementationOnce(() => Promise.resolve(mockUser));

		const response = await usecase.execute({
			username: 'testUser',
			password: 'hashedPassword',
		});

		expect(isError(response)).toBe(false);

		if (isError(response)) return;

		expect(response.success).toBeTruthy();
		expect(response.success.message).toEqual(usecase.successMessage);
		expect(response.success.data).toEqual({
			username: mockUser.username,
			email: mockUser.email,
			id: mockUser.id,
			description: mockUser.description,
			role: mockUser.role,
		});
	});

	it('should return error response if password does not match', async () => {
		spyBcryptCompare.mockImplementationOnce(() => Promise.resolve(false));
		spyGetUserByUsername.mockImplementationOnce(() => Promise.resolve(mockUser));

		const response = await usecase.execute({
			username: 'testUser',
			password: 'hashedPassword',
		});

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual(usecase.invalidCredentialsErrorMessage);
	});

	it('should return error response if user does not exist', async () => {
		spyBcryptCompare.mockImplementationOnce(() => Promise.resolve(true));
		spyGetUserByUsername.mockImplementationOnce(() => Promise.resolve(null));

		const response = await usecase.execute({
			username: 'testUser',
			password: 'hashedPassword',
		});

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual(usecase.invalidCredentialsErrorMessage);
	});

	it('should return error response infra request fails', async () => {
		spyBcryptCompare.mockImplementationOnce(() => Promise.resolve(true));
		spyGetUserByUsername.mockImplementationOnce(() => Promise.reject());

		const response = await usecase.execute({
			username: 'testUser',
			password: 'hashedPassword',
		});

		if (!isError(response)) return;

		expect(isError(response)).toBe(true);
		expect(response.error).toEqual(usecase.errorMessage);
	});
});
