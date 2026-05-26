import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { locales } from '@/lib/i18n';

const SITE_URL = process.env.RSS_URL ?? '';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const entries: MetadataRoute.Sitemap = [];

	for (const locale of locales) {
		const articles = await getAllArticles(locale);

		entries.push({
			url: `${SITE_URL}/${locale}`,
			changeFrequency: 'weekly',
			priority: 1,
		});

		entries.push({
			url: `${SITE_URL}/${locale}/articles`,
			changeFrequency: 'weekly',
			priority: 0.8,
		});

		for (const article of articles) {
			entries.push({
				url: `${SITE_URL}/${locale}/articles/${article.slug}`,
				lastModified: new Date(article.metadata.date),
				changeFrequency: 'monthly',
				priority: 0.7,
			});
		}
	}

	return entries;
}
