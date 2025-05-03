'use client';

import { Switch } from '@heroui/switch';
import { useIsSSR } from '@react-aria/ssr';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const isSSR = useIsSSR();

	const onChange = () =>
		theme === 'light' ? setTheme('dark') : setTheme('light');
	const isSelected = theme === 'light' || isSSR;

	return (
		<Switch
			endContent={<SunIcon />}
			isSelected={isSelected}
			startContent={<MoonIcon />}
			onChange={onChange}
		/>
	);
};
