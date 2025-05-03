import { LayoutProps } from '@/types';

export default function Layout({ children }: LayoutProps) {
	return (
		<div className='flex flex-grow items-center justify-center'>{children}</div>
	);
}
