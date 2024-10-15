import { RegisterUsecase } from './application/register.usecase';
import { RegisterInfra } from './infra/register.infra';
import { RegisterRepository } from './repository/register.repository';
import { UserClient } from '~/lib/prisma/clients/user/user.client';

export const provideRegisterUsecase = () => {
	const registerInfra = new RegisterInfra(new UserClient());
	const registerRepository = new RegisterRepository(registerInfra);

	return new RegisterUsecase(registerRepository);
};
