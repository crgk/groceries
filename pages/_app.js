import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'
import theme from '../components/theme.js'

function Application({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Essentials</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default Application
