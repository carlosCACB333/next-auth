'use client';

import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { EyeIcon, EyeOff } from 'lucide-react';
import { ProviderId } from 'next-auth/providers';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useActionState, useState } from 'react';

import { authenticate } from '@/actions/auth';
import { GithubIcon } from '@/components/icons';
import { appRoutes } from '@/config/routes';

const socialProviders: {
	id: ProviderId;
	label: string;
	icon: ReactNode;
}[] = [
	{
		id: 'github',
		label: 'Iniciar sesión con GitHub',
		icon: <GithubIcon />,
	},
];

export default function Page() {
	const [isVisible, setIsVisible] = useState(false);

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const [state, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);
	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<>
			<div className='flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-large font-medium'>Inicia sesión en tu cuenta</h1>
					<p className='text-small text-default-500'>para continuar en Acme</p>
				</div>

				{state?.message && <Alert color='danger'>{state.message}</Alert>}

				<Form
					action={formAction}
					className='flex flex-col gap-3'
					validationBehavior='native'
					validationErrors={state?.errors}
				>
					<input name='redirectTo' type='hidden' value={callbackUrl} />
					<input name='provider' type='hidden' value='credentials' />
					<Input
						defaultValue={state?.data?.email || ''}
						label='Correo Electrónico'
						name='email'
						placeholder='hello@example.com'
						type='email'
						variant='bordered'
					/>
					<Input
						defaultValue={state?.data?.password || ''}
						endContent={
							<button type='button' onClick={toggleVisibility}>
								{isVisible ? <EyeOff /> : <EyeIcon />}
							</button>
						}
						label='Contraseña'
						name='password'
						placeholder='****'
						type={isVisible ? 'text' : 'password'}
						variant='bordered'
					/>
					<div className='flex w-full items-center justify-between px-1 py-2'>
						<Link className='text-default-500' href='#' size='sm'>
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<Button
						className='w-full'
						color='primary'
						isDisabled={isPending}
						type='submit'
					>
						Iniciar sesión
					</Button>
				</Form>
				<div className='flex items-center gap-4 py-2'>
					<Divider className='flex-1' />
					<p className='shrink-0 text-tiny text-default-500'>O</p>
					<Divider className='flex-1' />
				</div>
				<div className='flex flex-col gap-2'>
					{socialProviders.map((provider) => (
						<form key={provider.id} action={formAction}>
							<input name='redirectTo' type='hidden' value={callbackUrl} />
							<input name='provider' type='hidden' value={provider.id} />
							<Button
								fullWidth
								aria-disabled={isPending}
								isDisabled={isPending}
								startContent={provider.icon}
								type='submit'
								variant='bordered'
							>
								{provider.label}
							</Button>
						</form>
					))}
				</div>
				<p className='text-center text-small'>
					¿Necesitas crear una cuenta?&nbsp;
					<Link href={appRoutes.auth.signUp.to} size='sm'>
						Crear
					</Link>
				</p>
			</div>
		</>
	);
}
