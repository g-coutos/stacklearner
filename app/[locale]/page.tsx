import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { LocaleToggle } from '@/components/locale-toggle';
import { Main } from '@/components/main';
import { TypographyH1 } from '@/components/typography';
import { getDictionary, type Locale } from '@/lib/i18n';
import logo from '../../public/logo.svg';

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getDictionary(locale as Locale);

	return (
		<>
			<Header isHomePage>
				<div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
					<div className="flex items-center gap-3">
						<Image
							src={process.env.GITHUB_AVATAR_URL || ''}
							alt=""
							width={30}
							height={30}
							className="rounded-full"
						/>
						<Link href={`/${locale}`} className="text-sm text-center ">
							stack learner{' '}
							<span className="block text-xs text-gray-500">
								(by Guilherme Couto)
							</span>
						</Link>
					</div>

					<nav className="flex items-center gap-3 md:ml-auto text-sm text-gray-500">
						<Link
							href={`/${locale}/articles`}
							className="hover:text-gray-600 transition-colors"
						>
							/articles
						</Link>
						<Link
							href={process.env.GITHUB_URL || ''}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-gray-600 transition-colors"
						>
							/github
						</Link>
						<Link
							href={process.env.LINKEDIN_URL || ''}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-gray-600 transition-colors"
						>
							/linkedin
						</Link>
					</nav>

					<LocaleToggle locale={locale as Locale} />
				</div>
			</Header>

			<Main>
				<section className="mb-8 flex flex-col items-center">
					<div className="mb-8 flex h-12.5 w-12.5 items-center justify-center rounded-2xl text-fluorescent-yellow shadow-lg bg-foreground">
						<Image
							src={logo}
							alt="Stack Learner Logo"
							width={40}
							height={40}
							draggable={false}
						/>
					</div>

					<span className="text-sm text-center">{t.home.tagline}</span>
					<TypographyH1 className="text-5xl md:text-6xl text-center font-bold">
						STACK LEARNER
					</TypographyH1>
					<h2 className="font-mono text-sm uppercase">
						<span className="text-amber-400">&gt;</span> building products in
						public
					</h2>
				</section>

				<section className="max-w-110 mx-auto text-center">
					<p>{t.home.bio}</p>

					<Link
						href={process.env.LINKEDIN_URL || ''}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block mt-5 px-4 py-3 border border-sky-500 rounded-md text-sm"
					>
						{t.home.cta}
					</Link>
				</section>
			</Main>
		</>
	);
}
