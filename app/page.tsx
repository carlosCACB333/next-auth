import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

import { subtitle, title } from '@/components/primitives';
import { appRoutes } from '@/config/routes';

export default function Home() {
	return (
		<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
			<div className='inline-block max-w-xl justify-center text-center'>
				<span className={title()}>Make&nbsp;</span>
				<span className={title({ color: 'violet' })}>beautiful&nbsp;</span>
				<br />
				<span className={title()}>
					websites regardless of your design experience.
				</span>
				<div className={subtitle({ class: 'mt-4' })}>
					Beautiful, fast and modern React UI library.
				</div>
			</div>

			<div className='flex gap-3'>
				<Link
					className={buttonStyles({
						color: 'primary',
						radius: 'full',
						variant: 'shadow',
					})}
					href={appRoutes.blog.to}
				>
					Blog
				</Link>
				<Link
					className={buttonStyles({ variant: 'bordered', radius: 'full' })}
					href={appRoutes.auth.signIn.to}
				>
					Login
				</Link>
			</div>
		</section>
	);
}
