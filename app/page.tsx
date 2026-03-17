import Image from 'next/image';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';
import { Header } from '../components/header';
import { Main } from '../components/main';
import { TypographyH1 } from '../components/typography';
import logo from '../public/logo.svg';

export default function Home() {
	return (
		<>
			<Header isHomePage>
				<div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
					<div className="flex items-center gap-3">
						<Image
							src={process.env.GITHUB_AVATAR_URL || ''}
							alt=""
							width={30}
							height={30}
							className="rounded-full"
						/>
						<Link href="/" className="text-sm text-center ">
							stack learner{' '}
							<span className="block text-xs text-gray-500">
								(by Guilherme Couto)
							</span>
						</Link>
					</div>

					<nav className="flex items-center gap-3 md:ml-auto text-sm text-gray-500">
						<Link
							href="/articles"
							className="hover:text-gray-600 transition-colors"
						>
							/articles
						</Link>
						<Link
							href={process.env.GITHUB_URL || ''}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-gray-600 transition-colors"
						>
							/github
						</Link>
						<Link
							href={process.env.LINKEDIN_URL || ''}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-gray-600 transition-colors"
						>
							/linkedin
						</Link>
					</nav>
				</div>
			</Header>

			<Main>
				<section className="mb-8 flex flex-col items-center">
					<div className="mb-8 flex h-12.5 w-12.5 items-center justify-center rounded-2xl text-fluorescent-yellow shadow-lg bg-foreground">
						<Image src={logo} alt="Stack Learner Logo" width={40} height={40} />
					</div>

					<span className="text-sm">Learning / Writing / Sharing</span>
					<TypographyH1 className="text-5xl md:text-6xl text-center font-bold">
						STACK LEARNER
					</TypographyH1>
					<h2 className="font-mono text-sm uppercase">
						<span className="text-amber-400">&gt;</span> building knowledge in
						public
					</h2>
				</section>

				<section className="max-w-100 mx-auto text-center">
					<p>
						Stack Learner is the personal blog/portfolio of Guilherme Couto ,
						where he explores and shares insights about the world of
						Software/Product Engineering and some bits about his Life.
					</p>

					<nav className="mt-6 flex justify-center gap-4">
						<Link
							href="/articles"
							className="flex items-center gap-1 w-fit p-1 text-xs border border-gray-200 rounded-md"
						>
							<FaLink /> articles
						</Link>
					</nav>
				</section>
			</Main>
		</>
	);
}
