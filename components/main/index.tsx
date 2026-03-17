import { cn } from '@/lib/utils';

export function Main({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<main
			className={cn(
				'w-full max-w-2xl mx-auto p-8 border-x border-b border-gray-200',
				className,
			)}
		>
			{children}
		</main>
	);
}
