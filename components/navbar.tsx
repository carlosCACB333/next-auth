import { Input } from '@heroui/input';
import { Kbd } from '@heroui/kbd';
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/navbar';
import { link as linkStyles } from '@heroui/theme';
import clsx from 'clsx';
import NextLink from 'next/link';

import { Logo, SearchIcon } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { auth } from '@/libs/auth';

import { UserMenu } from './user-menu';

export const Navbar = async () => {
	const session = await auth();

	const searchInput = (
		<Input
			aria-label='Search'
			classNames={{
				inputWrapper: 'bg-default-100',
				input: 'text-sm',
			}}
			endContent={
				<Kbd className='hidden lg:inline-block' keys={['command']}>
					K
				</Kbd>
			}
			labelPlacement='outside'
			placeholder='Search...'
			startContent={
				<SearchIcon className='pointer-events-none flex-shrink-0 text-base text-default-400' />
			}
			type='search'
		/>
	);

	return (
		<HeroUINavbar maxWidth='xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand as='li' className='max-w-fit gap-3'>
					<NextLink className='flex items-center justify-start gap-1' href='/'>
						<Logo />
						<p className='font-bold text-inherit'>ACME</p>
					</NextLink>
				</NavbarBrand>

				{siteConfig.navItems.map((item) => (
					<NavbarItem key={item.href} className='hidden lg:flex'>
						<NextLink
							className={clsx(
								linkStyles({ color: 'foreground' }),
								'data-[active=true]:font-medium data-[active=true]:text-primary',
							)}
							color='foreground'
							href={item.href}
						>
							{item.label}
						</NextLink>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent justify='end'>
				<NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>
				<NavbarItem>
					<UserMenu user={session?.user} />
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};
