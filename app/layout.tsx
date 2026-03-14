import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { Footer } from "@/components/footer";

const inter = Inter({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	preload: true,
});

const instrumentSerif = Instrument_Serif({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-instrument-serif",
	preload: true,
});

const departureMono = localFont({
	src: "../public/font/DepartureMono-Regular.woff2",
	variable: "--font-departure",
});

export const metadata: Metadata = {
	title: "Stack Learner by Guilherme Couto",
	description:
		"Stack Learner is the personal blog/portfolio of Guilherme Couto, where he explores and shares insights about the world of Software/Product Engineering && some bits about his Life.",
	alternates: {
		types: {
			"application/rss+xml": "/rss.xml",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} ${instrumentSerif.variable} ${departureMono.variable} antialiased`}
			>
				{children}
				<Footer />
			</body>
		</html>
	);
}
