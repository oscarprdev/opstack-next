import NextAuth, { NextAuthResult } from 'next-auth';
import authConfig from './auth.config';
import { $Enums } from '@prisma/client';

const nextAuth = NextAuth({
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
			}

			return token;
		},
		session({ session, token }) {
			if (token && session.user) {
				session.user.role = token.role as $Enums.Role;
				session.user.id = token.id as string;
			}

			return session;
		},
	},
	session: { strategy: 'jwt' },
	...authConfig,
});

export const signIn: NextAuthResult['signIn'] = nextAuth.signIn;
export const auth: NextAuthResult['auth'] = nextAuth.auth;
export const { GET, POST }: NextAuthResult['handlers'] = nextAuth.handlers;
export const signOut: NextAuthResult['signOut'] = nextAuth.signOut;
