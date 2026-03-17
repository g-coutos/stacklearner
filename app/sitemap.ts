import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

const SITE_URL = process.env.RSS_URL ?? '';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const articles = await getAllArticles();

	const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
		url: `${SITE_URL}/articles/${article.slug}`,
		lastModified: new Date(article.metadata.date),
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	return [
		{
			url: SITE_URL,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${SITE_URL}/articles`,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		...articleEntries,
	];
}
