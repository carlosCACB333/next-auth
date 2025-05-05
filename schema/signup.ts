import { z } from 'zod';

export const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Nombre requerido' }),
    email: z.string().email({ message: 'Correo electrónico inválido' }),
    image: z.string().url({ message: 'No es una url válida' }).optional().or(z.literal('')),
    password: z.string().min(8, { message: 'Contraseña inválida' }),
    confirmPassword: z.string().min(8, { message: 'Contraseña inválida' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Las contraseñas no coinciden',
      });
    }
  });

export type SignUpFields = z.infer<typeof SignUpSchema>;
export type SignUpFieldErrors = Partial<Record<keyof SignUpFields, string | string[]>>;
