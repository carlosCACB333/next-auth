'use client';

import type { ThemeProviderProps } from 'next-themes';

import { Spinner } from '@heroui/spinner';
import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

export interface ProvidersProps {
	children: ReactNode;
	themeProps?: ThemeProviderProps;
}

declare module '@react-types/shared' {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>['push']>[1]
		>;
	}
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();

	return (
		<Suspense fallback={<Spinner />}>
			<HeroUIProvider
				className='flex min-h-dvh flex-col'
				navigate={router.push}
			>
				<ToastProvider />
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</HeroUIProvider>
		</Suspense>
	);
}
