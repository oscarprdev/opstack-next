import { LoginUsecase } from './application/login.usecase';
import { LoginInfra } from './infra/login.infra';
import { LoginRepository } from './repository/login.repository';
import { UserClient } from '~/lib/prisma/clients/user/user.client';

export const provideLoginUsecase = () => {
	const loginInfra = new LoginInfra(new UserClient());
	const loginRepository = new LoginRepository(loginInfra);

	return new LoginUsecase(loginRepository);
};
