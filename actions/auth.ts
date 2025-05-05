'use server';

import { AuthError } from 'next-auth';
import { ProviderId } from 'next-auth/providers';
import { redirect } from 'next/navigation';

import { appRoutes } from '@/config/routes';
import { signIn, signOut } from '@/libs/auth';
import { hashPassword } from '@/libs/bcrypt';
import { prisma } from '@/libs/prisma';
import { SignInFieldErrors, SignInFields, SignInSchema } from '@/schema/signin';
import { SignUpFields, SignUpSchema } from '@/schema/signup';
import { Status } from '@/types';

interface AuthenticateState {
  message?: string;
  errors?: SignInFieldErrors;
  data?: SignInFields;
}

export async function authenticate(
  prevState: AuthenticateState | undefined,
  formData?: FormData
): Promise<AuthenticateState> {
  const rawData = {
    email: formData?.get('email'),
    password: formData?.get('password'),
  } as SignInFields;

  const provider = formData?.get('provider') as ProviderId;
  const redirectTo = formData?.get('redirectTo') as string;

  try {
    if (provider === 'credentials') {
      const { success, data, error } = SignInSchema.safeParse(rawData);

      const errors: SignInFieldErrors = success ? {} : error.formErrors.fieldErrors;

      if (!success) {
        return {
          errors,
          data: rawData,
          message: 'Datos incorrectos',
        };
      }

      await signIn(provider, { redirectTo, ...data });
    } else {
      await signIn(provider, {
        redirectTo,
      });
    }

    return {};
  } catch (error) {
    let message = 'Ocurrió un error inesperado. Intente más tarde';

    if (error instanceof AuthError) {
      switch (error.name) {
        case 'CredentialsSignin':
          message = 'Credenciales incorrectas';
          break;

        case 'Configuration':
          message = 'Error de configuración';
          break;
      }

      return {
        message,
      };
    }

    throw error;
  }
}

export const handleSignOut = async () => {
  await signOut();
};

export const signUpUser = async (
  form: SignUpFields
): Promise<{ status: Status; errors?: SignInFieldErrors; message: string }> => {
  const { success, data, error } = SignUpSchema.safeParse(form);

  const errors: SignInFieldErrors = success ? {} : error.formErrors.fieldErrors;

  if (!success) {
    return {
      status: Status.FAILED,
      errors,
      message: 'Datos incorrectos',
    };
  }

  const userExists = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (userExists) {
    return {
      status: Status.FAILED,
      errors: {
        email: ['El correo electrónico ya está en uso'],
      },
      message: 'El correo electrónico ya está en uso',
    };
  }

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      image: data.image,
      password: await hashPassword(data.password),
    },
  });

  redirect(appRoutes.auth.newUser.to);
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
