import { getAllArticles } from "@/lib/articles";

const SITE_URL = process.env.RSS_URL;

export async function GET() {
	const articles = await getAllArticles();

	const published = articles
		.filter((a) => a.metadata.published)
		.sort(
			(a, b) =>
				new Date(b.metadata.date).getTime() -
				new Date(a.metadata.date).getTime(),
		);

	const lastBuildDate =
		published.length > 0
			? new Date(published[0].metadata.date).toUTCString()
			: new Date().toUTCString();

	const items = published
		.map((article) => {
			const url = `${SITE_URL}/articles/${article.slug}`;
			const pubDate = new Date(article.metadata.date).toUTCString();
			return `
    <item>
      <title><![CDATA[${article.metadata.title}]]></title>
      <link>${url}</link>
      <description><![CDATA[${article.metadata.description ?? ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${url}</guid>
    </item>`;
		})
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[Stack Learner By Guilherme Couto]]></title>
    <link>${SITE_URL}</link>
    <description><![CDATA[Stack Learner By Guilherme Couto]]></description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
