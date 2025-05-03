'use client';

import { Avatar } from '@heroui/avatar';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from '@heroui/dropdown';
import { LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { User } from 'next-auth';

import { authenticate, handleSignOut } from '@/actions/auth';

import { ThemeSwitch } from './theme-switch';

interface Props {
	user?: User;
}

export const UserMenu = ({ user }: Props) => {
	return (
		<Dropdown showArrow placement='bottom-end' radius='sm'>
			<DropdownTrigger>
				<Avatar
					className='cursor-pointer'
					name={user?.name || ''}
					src={user?.image || ''}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label='user menu' disabledKeys={['avatar']}>
				{user ? (
					<DropdownSection aria-label='private'>
						<DropdownItem key='avatar' isReadOnly className='opacity-100'>
							<div className='flex gap-2'>
								<Avatar name={user.name!} src={user.image!} />
								<div>
									<p className='font-bold'>{user.email}</p>
									<p className='text-tiny capitalize'>
										{user.name?.toLocaleLowerCase()}
									</p>
								</div>
							</div>
						</DropdownItem>
					</DropdownSection>
				) : null}

				<DropdownSection aria-label='private and public'>
					{user ? (
						<DropdownItem
							key='profile'
							startContent={<UserIcon />}
							onPress={handleSignOut}
						>
							Perfil
						</DropdownItem>
					) : null}
					<DropdownItem
						key='theme'
						isReadOnly
						className='opacity-100'
						endContent={<ThemeSwitch />}
					>
						Tema
					</DropdownItem>
					<DropdownItem
						key='logout'
						color={user ? 'danger' : 'default'}
						endContent={
							user ? <LogOutIcon size={20} /> : <LogInIcon size={20} />
						}
						onPress={user ? handleSignOut : () => authenticate(undefined)}
					>
						{user ? 'Cerrar sessión' : 'Iniciar sessión'}
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
};
