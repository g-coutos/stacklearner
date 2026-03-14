import Link from "next/link";
import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { TypographyH1 } from "@/components/typography";
import { getAllArticles } from "@/lib/articles";

export default async function Page() {
	const articles = (await getAllArticles())
		.filter((post) => post.metadata.published)
		.sort(
			(a, b) =>
				new Date(b.metadata.date).getTime() -
				new Date(a.metadata.date).getTime(),
		);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString).toLocaleDateString("en-US", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});

		return date;
	};

	return (
		<>
			<Header>
				<TypographyH1 className="text-4xl md:text-6xl font-bold">
					Articles
				</TypographyH1>
				<p className="text-sm text-gray-500">
					A collection of articles written by Guilherme Couto on various topics
					related to Software/Product Engineering && Life.
				</p>
			</Header>
			<Main>
				{articles.length > 0 ? (
					<ul>
						{articles.map((article) => (
							<li key={article.slug}>
								<div className="flex gap-1 text-xs text-gray-400 font-medium">
									<span>{formatDate(article.metadata.date)}</span>–
									<span>{article.readingTime} min read</span>
								</div>

								<Link
									href={`/articles/${article.slug}`}
									className="text-md underline"
								>
									{article.metadata.title}
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p className="font-mono text-sm text-center text-gray-400">
						[ 404 NO ARTICLES FOUND ]
					</p>
				)}
			</Main>
		</>
	);
}
