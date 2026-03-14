import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export function BackToHome() {
	return (
		<Link
			href="/"
			className="flex items-center gap-2 mb-8 text-xs text-gray-500 hover:text-gray-700 transition-[300ms]"
		>
			<FaArrowLeft size={12} /> Back to home
		</Link>
	);
}
