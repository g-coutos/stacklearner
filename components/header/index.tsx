import { BackToHome } from '../back-to-home';

export function Header({
	children,
	isHomePage = false,
}: {
	children: React.ReactNode;
	isHomePage?: boolean;
}) {
	return (
		<header
			className={`w-full max-w-2xl mx-auto ${isHomePage ? 'px-8 py-4' : 'p-8'} border-x border-y border-gray-200`}
		>
			{isHomePage ? null : <BackToHome />}
			{children}
		</header>
	);
}
