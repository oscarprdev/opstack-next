import { UserModel } from '~/features/shared/models/user.model';
import { CreateUserPayload } from '~/features/user/register/shared/types';

export interface RegisterPort {
	getUserByCredentials(username: string, password: string): Promise<UserModel | null>;
	createUser(payload: CreateUserPayload): Promise<void>;
}
