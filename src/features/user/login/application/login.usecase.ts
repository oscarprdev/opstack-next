import bcrypt from 'bcryptjs';
import { UseCase } from '~/features/shared/application/usecase';
import { UserModel } from '~/features/shared/models/user.model';
import { LoginDto, loginDto } from '~/features/user/login/application/login.dto';
import { LoginPort } from '~/features/user/login/application/login.port';
import { Either } from '~/lib/utils/either';

type Output = Either<string, { data: Omit<UserModel, 'password'>; message: string }>;

export interface ILoginUsecase {
	execute(input: LoginDto): Promise<Output>;
}

export class LoginUsecase extends UseCase implements ILoginUsecase {
	readonly successMessage = 'User logged in successfully';
	readonly errorMessage = 'Error logging in';
	readonly invalidCredentialsErrorMessage = 'Invalid credentials';

	constructor(private readonly ports: LoginPort) {
		super();
	}

	async execute(input: LoginDto): Promise<Output> {
		try {
			const { username, password } = this.parseInput<LoginDto>(loginDto, input);

			const user = await this.ports.getUserByUsername(username);
			if (!user) throw new Error(this.invalidCredentialsErrorMessage);

			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) throw new Error(this.invalidCredentialsErrorMessage);

			return this.successResponse({
				data: {
					username: user.username,
					email: user.email,
					id: user.id,
					description: user.description,
					role: user.role,
				},
				message: this.successMessage,
			});
		} catch (error: unknown) {
			return this.errorResponse(error, this.errorMessage);
		}
	}
}
