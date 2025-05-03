'use client';

import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { addToast } from '@heroui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUpUser } from '@/actions/auth';
import { appRoutes } from '@/config/routes';
import { SignUpFields, SignUpSchema } from '@/schema/signup';
import { Status } from '@/types';

export default function Page() {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const { formState, register, handleSubmit } = useForm({
		mode: 'onChange',
		resolver: zodResolver(SignUpSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		const { status, message } = await signUpUser(data);

		addToast({
			color: status === Status.SUCCESS ? 'success' : 'danger',
			description: message,
		});
	});

	const getAttr = (field: keyof SignUpFields) => {
		return {
			...register(field),
			variant: 'bordered' as const,
			errorMessage: formState.errors[field]?.message,
			isInvalid: Boolean(formState.errors[field]),
		};
	};

	return (
		<>
			<div className='flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-large font-medium'>Crea una cuenta</h1>
					<p className='text-small text-default-500'>para continuar en Acme</p>
				</div>

				<form className='flex flex-col gap-3' onSubmit={onSubmit}>
					<Input label='Nombres' placeholder='carlos' {...getAttr('name')} />
					<Input
						label='Imagen'
						placeholder='https://s.avatar.com'
						{...getAttr('image')}
					/>
					<Input
						label='Correo Electrónico'
						placeholder='hello@example.com'
						type='email'
						{...getAttr('email')}
					/>
					<Input
						endContent={
							<button type='button' onClick={toggleVisibility}>
								{isVisible ? <EyeOff /> : <EyeIcon />}
							</button>
						}
						label='Contraseña'
						placeholder='****'
						type={isVisible ? 'text' : 'password'}
						{...getAttr('password')}
					/>

					<Input
						endContent={
							<button type='button' onClick={toggleVisibility}>
								{isVisible ? <EyeOff /> : <EyeIcon />}
							</button>
						}
						label='Confirmar Contraseña'
						placeholder='****'
						type={isVisible ? 'text' : 'password'}
						{...getAttr('confirmPassword')}
					/>

					<Button
						className='w-full'
						color='primary'
						isDisabled={formState.isSubmitting}
						isLoading={formState.isSubmitting}
						type='submit'
					>
						Crear Cuenta
					</Button>
				</form>
				<div className='flex items-center gap-4 py-2'>
					<Divider className='flex-1' />
					<p className='shrink-0 text-tiny text-default-500'>O</p>
					<Divider className='flex-1' />
				</div>

				<p className='text-center text-small'>
					¿Ya tienes una cuenta?&nbsp;
					<Link href={appRoutes.auth.signIn.to} size='sm'>
						Iniciar sesión
					</Link>
				</p>
			</div>
		</>
	);
}
