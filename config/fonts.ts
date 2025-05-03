import localFont from 'next/font/local';

export const fontSans = localFont({
	variable: '--font-sans',
	src: [
		{
			path: '../fonts/roboto.ttf',
			style: 'normal',
		},
	],
});
