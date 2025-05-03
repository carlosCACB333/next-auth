import type { Provider } from 'next-auth/providers';

import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

import { comparePassword } from './bcrypt';
import { prisma } from './prisma';

import { findUserByEmail } from '@/actions/auth';
import { appRoutes } from '@/config/routes';

const providers: Provider[] = [
	Credentials({
		async authorize(c) {
			const user = await findUserByEmail(c.email as string);

			if (!user) return null;

			const isMatch = await comparePassword(
				c.password as string,
				user.password!,
			);

			if (!isMatch) return null;

			return user;
		},
	}),
	GitHub,
];

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
	trustHost: true,
	pages: {
		signIn: appRoutes.auth.signIn.to,
		signOut: appRoutes.auth.signOut.to,
		newUser: appRoutes.auth.newUser.to,
	},
	session: {
		strategy: 'jwt',
	},
	jwt: {
		maxAge: 60 * 60 * 1, // 1 h
	},
	providers: providers,
	adapter: PrismaAdapter(prisma),
	experimental: { enableWebAuthn: true },
});
