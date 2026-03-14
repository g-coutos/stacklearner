export function Main({ children }: { children: React.ReactNode }) {
	return (
		<main className="w-full max-w-2xl mx-auto p-8 border-x border-b border-gray-200">
			{children}
		</main>
	);
}
