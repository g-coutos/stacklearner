import Link from 'next/link';
import { TagBadge } from '@/components/tag-badge';
import { getAllTags } from '@/lib/articles';
import { cn } from '@/lib/utils';

interface TagFilterProps {
	activeTag?: string;
}

export async function TagFilter({ activeTag }: TagFilterProps) {
	const tags = await getAllTags();

	return (
		<div className="flex flex-wrap gap-2 items-center p-8">
			<Link
				href="/articles"
				className={cn(
					'px-2 py-0.5 rounded text-xs font-mono transition-colors duration-200',
					!activeTag
						? 'bg-(--fluorescent-yellow) text-foreground'
						: 'bg-gray-100 text-gray-500 hover:bg-gray-200',
				)}
			>
				All
			</Link>
			{tags.map((tag) => (
				<TagBadge key={tag} tag={tag} active={tag === activeTag} />
			))}
		</div>
	);
}
