import type { MetadataRoute } from 'next';

const SITE_URL = process.env.RSS_URL ?? '';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
