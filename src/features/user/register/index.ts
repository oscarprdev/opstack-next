import { UserClient } from '~/lib/prisma/clients/user/user.client';
import { RegisterInfra } from './infra/register.infra';
import { RegisterRepository } from './repository/register.repository';
import { RegisterUsecase } from './application/register.usecase';

export const provideRegisterUsecase = () => {
	const registerInfra = new RegisterInfra(new UserClient());
	const registerRepository = new RegisterRepository(registerInfra);

	return new RegisterUsecase(registerRepository);
};
