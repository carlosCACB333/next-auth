import { Navbar } from '@/components/navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';

import '@/styles/globals.css';
import { Link } from '@heroui/link';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body className={clsx('bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Navbar />
          <main className='container mx-auto flex max-w-7xl flex-grow flex-col p-4'>{children}</main>
          <footer className='flex w-full items-center justify-center py-3'>
            <Link
              isExternal
              className='flex items-center gap-1 text-current'
              href='https://devcastillo.com'
              title='dev castillo home page'
            >
              <span className='text-default-600'>Desarrollado por</span>
              <p className='text-primary'>carlos</p>
            </Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
