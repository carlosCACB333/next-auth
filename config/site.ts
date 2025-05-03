import { appRoutes } from './routes';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Next.js + HeroUI',
	description: 'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Blog',
			href: appRoutes.blog.to,
		},
	],
};
