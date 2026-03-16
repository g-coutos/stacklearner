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

function toSlug(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export async function getAllTags(): Promise<string[]> {
	const files = fs.readdirSync(articlesDirectory);
	const tags = new Set<string>();

	for (const fileName of files) {
		const filePath = path.join(articlesDirectory, fileName);
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const { data } = matter(fileContent);

		if (data.published && Array.isArray(data.tags)) {
			for (const tag of data.tags) {
				tags.add(toSlug(tag));
			}
		}
	}

	return Array.from(tags).sort();
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
