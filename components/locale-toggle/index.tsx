'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale, locales } from '@/lib/i18n';

export function LocaleToggle({ locale }: { locale: Locale }) {
	const pathname = usePathname();

	const getLocalePath = (targetLocale: Locale) => {
		const segments = pathname.split('/');
		if (locales.includes(segments[1] as Locale)) {
			segments[1] = targetLocale;
			return segments.join('/');
		}
		return `/${targetLocale}${pathname}`;
	};

	return (
		<div className="flex items-center gap-1 text-xs text-gray-500">
			{locales.map((loc, i) => (
				<span key={loc} className="flex items-center gap-1">
					{i > 0 && <span aria-hidden>|</span>}
					<Link
						href={getLocalePath(loc)}
						className={
							loc === locale
								? 'text-foreground font-medium'
								: 'hover:text-gray-700 transition-colors'
						}
					>
						{loc.toUpperCase()}
					</Link>
				</span>
			))}
		</div>
	);
}
