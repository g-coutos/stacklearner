import fs from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import path from 'path';
import { markdownToHtml } from './markdown-to-html';

const articlesDirectory = path.join(process.cwd(), '/articles');

function getReadingTime(content: string): number {
	const text = content
		.replace(/```[\s\S]*?```/g, '')
		.replace(/[#*`[\]()>_~]/g, '');
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.ceil(words / 200);
}

export async function getAllArticles() {
	const files = fs.readdirSync(articlesDirectory);

	return files.map((fileName) => {
		const slug = fileName.replace('.md', '');
		const filePath = path.join(articlesDirectory, fileName);
		const fileContent = fs.readFileSync(filePath, 'utf8');

		const { data, content } = matter(fileContent);

		return {
			slug,
			metadata: data,
			readingTime: getReadingTime(content),
		};
	});
}

export async function getArticleBySlug(slug: string) {
	const filePath = path.join(articlesDirectory, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		notFound();
	}

	const fileContent = fs.readFileSync(filePath, 'utf8');

	const { data, content } = matter(fileContent);

	const htmlContent = await markdownToHtml(content);

	return {
		slug,
		metadata: data,
		tags: data.tags || [],
		content: htmlContent,
		readingTime: getReadingTime(content),
	};
}
