import { Header } from '@/components/header';
import { Main } from '@/components/main';

export default function NotFound() {
	return (
		<>
			<Header>
				<h1 className="text-6xl md:text-8xl font-bold">404</h1>
			</Header>
			<Main>
				<span className="w-fit text-gray-400 font-mono">
					[ PAGE NOT FOUND ]
				</span>
			</Main>
		</>
	);
}
