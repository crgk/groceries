import { Html, Head, Main, NextScript } from 'next/document';
import theme from '../components/theme.js';

function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content={theme.palette.primary.main} />
				<link rel="icon" href="/basket-check-icon-white.png" />
				<link rel="apple-touch-icon" href="/basket-check-150x150-white.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default Document
