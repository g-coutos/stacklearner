import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import "prismjs/themes/prism.css";

export async function markdownToHtml(markdown: string): Promise<string> {
	const result = await remark()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrism)
		.use(rehypeStringify)
		.process(markdown);

	return result.toString();
}
