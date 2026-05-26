import Link from 'next/link';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { TagFilter } from '@/components/tag-filter';
import { TypographyH1 } from '@/components/typography';
import { getAllArticles, getArticlesByTag } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ tag?: string }>;
}) {
	const { locale } = await params;
	const { tag } = await searchParams;
	const t = await getDictionary(locale as Locale);

	const articles = (
		tag
			? await getArticlesByTag(tag, locale as Locale)
			: await getAllArticles(locale as Locale)
	).sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
	);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString(
			locale === 'pt' ? 'pt-BR' : 'en-US',
			{
				day: 'numeric',
				month: 'short',
				year: 'numeric',
			},
		);
	};

	return (
		<>
			<Header backToHomeLabel={t.nav.backToHome} locale={locale}>
				<TypographyH1 className="text-4xl md:text-6xl font-bold">
					{t.articles.heading}
				</TypographyH1>
				<p className="text-sm text-gray-500">{t.articles.description}</p>
			</Header>
			<Main className="p-0">
				<TagFilter
					activeTag={tag}
					locale={locale as Locale}
					allLabel={t.nav.all}
				/>
				{articles.length > 0 ? (
					<ul>
						{articles.map((article, index) => (
							<li
								key={article.slug}
								className={`px-8 py-5 border-b border-gray-200${index === 0 ? ' border-t' : ''}${index === articles.length - 1 ? ' border-b-0!' : ''}`}
							>
								<div className="flex gap-1 text-xs text-gray-400 font-medium">
									<span>{formatDate(article.metadata.date)}</span>–
									<span>
										{article.readingTime} {t.articles.minRead}
									</span>
								</div>

								<Link
									href={`/${locale}/articles/${article.slug}`}
									className="text-md underline"
								>
									{article.metadata.title}
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p className="font-mono text-sm text-center text-gray-400">
						{t.articles.noArticles}
					</p>
				)}
			</Main>
		</>
	);
}
