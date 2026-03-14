import Link from 'next/link';

export function Footer() {
	const GITHUB_REPO_URL = process.env.GITHUB_REPO_URL || '';

	return (
		<footer className="max-w-2xl w-full mx-auto">
			<div className="h-16 flex items-center justify-center md:justify-start gap-2 mx-auto p-8 border border-t-0 border-gray-200 text-xs">
				<span>© {new Date().getFullYear()} Stack Learner</span>
				<span className="text-gray-500">|</span>
				<Link
					href={GITHUB_REPO_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="block text-gray-500 hover:text-gray-700 transition-colors duration-200"
				>
					Code
				</Link>
				<Link
					href="/rss.xml"
					target="_blank"
					rel="noopener noreferrer"
					className="block text-gray-500 hover:text-gray-700 transition-colors duration-200"
				>
					RSS Feed
				</Link>
			</div>
		</footer>
	);
}
