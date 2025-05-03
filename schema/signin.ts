import { z } from 'zod';

export const SignInSchema = z.object({
	email: z.string().email({ message: 'Correo electrónico inválido' }),
	password: z.string().min(4, { message: 'Contraseña inválida' }),
});

export type SignInFields = z.infer<typeof SignInSchema>;
export type SignInFieldErrors = Partial<
	Record<keyof SignInFields, string | string[]>
>;
