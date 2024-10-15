import { UserModel } from '~/features/shared/models/user.model';

export interface LoginPort {
	getUserByUsername(username: string): Promise<UserModel | null>;
}
