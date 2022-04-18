import { Html, Head, Main, NextScript } from 'next/document';
import theme from '../components/theme.js';

function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content={theme.palette.primary.main} />
				<meta name="mobile-web-app-capable" content="yes" />
				<link rel="icon" href="/icons/basket-check-icon-white.png" />
				<link rel="apple-touch-icon" href="/icons/basket-check-150x150-white.png" />
				<link rel="webmanifest" href="manifest.webmanifest" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default Document
