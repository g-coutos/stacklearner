import { cn } from '@/lib/utils';

export function TypographyH1({
	className,
	...props
}: React.ComponentProps<'h1'>) {
	return (
		<h1
			{...props}
			className={cn('my-3 text-3xl md:text-4xl font-serif', className)}
		>
			{props.children}
		</h1>
	);
}
