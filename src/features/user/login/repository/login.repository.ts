import { UserModel } from '~/features/shared/models/user.model';
import { LoginInfra } from '~/features/user/login/infra/login.infra';
import { LoginPort } from '~/features/user/login/application/login.port';

export class LoginRepository implements LoginPort {
	constructor(private readonly infra: LoginInfra) {}

	async getUserByUsername(username: string): Promise<UserModel | null> {
		const infraUser = await this.infra.getUserByUsername(username);
		if (!infraUser) return null;

		return this.mapUserInfraToApplicationLayer(infraUser);
	}

	private mapUserInfraToApplicationLayer(infraUser: UserModel): UserModel {
		return {
			username: infraUser.username,
			email: infraUser.email,
			id: infraUser.id,
			description: infraUser.description,
			role: infraUser.role,
			password: infraUser.password,
		};
	}
}
