import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
	tag: string;
	active?: boolean;
}

export function TagBadge({ tag, active = false }: TagBadgeProps) {
	return (
		<Link
			href={`/articles?tag=${tag}`}
			className={cn(
				'px-2 py-0.5 rounded text-xs font-mono transition-colors duration-200',
				active
					? 'bg-(--fluorescent-yellow) text-foreground'
					: 'bg-gray-100 text-gray-500 hover:bg-gray-200',
			)}
		>
			{tag}
		</Link>
	);
}
