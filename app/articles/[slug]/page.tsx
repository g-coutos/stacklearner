import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { TypographyH1 } from '@/components/typography';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { slug } = await params;
	const article = await getArticleBySlug(slug).catch(() => null);

	if (!article) {
		return { title: 'Article not found' };
	}

	return {
		title: article.metadata.title,
		description: article.metadata.description,
	};
}

export async function generateStaticParams() {
	const articles = await getAllArticles();

	return articles.map((article) => ({
		slug: article.slug,
	}));
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const article = await getArticleBySlug(slug);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString).toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});

		return date;
	};

	return (
		<>
			<Header>
				<span className="w-fit block mx-auto mb-1 text-sm font-medium text-gray-500">
					{formatDate(article.metadata.date)}
				</span>
				<span className="w-fit block mx-auto mb-3 text-xs text-gray-400">
					{article.readingTime} min read
				</span>
				<TypographyH1 className="max-w-125 mx-auto text-4xl md:text-6xl text-center">
					{article.metadata.title}
				</TypographyH1>
				<ul className="max-w-125 mx-auto mt-6 flex flex-wrap justify-center gap-2">
					{article.tags.map((tag: string) => (
						<li
							key={tag}
							className="px-3 py-1 text-xs text-gray-500 border border-gray-400 rounded-full"
						>
							# {tag}
						</li>
					))}
				</ul>
			</Header>

			<Main>
				<article
					// biome-ignore lint/security/noDangerouslySetInnerHtml: This is necessary to render the HTML content of the article.
					dangerouslySetInnerHTML={{ __html: article.content }}
					className="prose prose-neutral"
				></article>
			</Main>
		</>
	);
}
