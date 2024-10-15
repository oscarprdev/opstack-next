import { $Enums } from '@prisma/client';

export type CreateUserPayload = {
	username: string;
	password: string;
	email: string;
	role: $Enums.Role;
};
