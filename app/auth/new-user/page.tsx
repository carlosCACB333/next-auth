import { Button } from '@heroui/button';
import Link from 'next/link';

import { appRoutes } from '@/config/routes';
import { auth } from '@/libs/auth';

export default async function Page() {
  const session = await auth();

  return (
    <>
      <div className='flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-large font-medium'>Cuenta creada</h1>
          <p className='text-small text-default-500'>
            Tu cuenta a sido creado con éxito. Ya puedes interactuar en la plataforma.
          </p>
        </div>
        {session ? (
          <Button as={Link} className='w-full' color='primary' href='/'>
            Ir a Inicio
          </Button>
        ) : (
          <Button as={Link} className='w-full' color='primary' href={appRoutes.auth.signIn.to}>
            Iniciar sesión
          </Button>
        )}
      </div>
    </>
  );
}
