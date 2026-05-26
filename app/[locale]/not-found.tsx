'use client';

import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Main } from '@/components/main';

const messages = {
	pt: '[ PÁGINA NÃO ENCONTRADA ]',
	en: '[ PAGE NOT FOUND ]',
};

const backLabels = {
	pt: 'Voltar para home',
	en: 'Back to home',
};

export default function NotFound() {
	const params = useParams();
	const locale = (params?.locale as string) || 'pt';
	const message = messages[locale as keyof typeof messages] ?? messages.en;
	const backLabel =
		backLabels[locale as keyof typeof backLabels] ?? backLabels.en;

	return (
		<>
			<Header backToHomeLabel={backLabel} locale={locale}>
				<h1 className="text-6xl md:text-8xl font-bold">404</h1>
			</Header>
			<Main>
				<span className="w-fit text-gray-400 font-mono">{message}</span>
			</Main>
		</>
	);
}
