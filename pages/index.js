import Head from 'next/head'
import Script from 'next/script'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Essentials from '@components/Essentials'
import IdentityWidget from '@components/IdentityWidget'

export default function Home() {
	return (
		<div className="container">
			<IdentityWidget/>
			<Head>
				<title>Essential Groceries</title>
				<link rel="icon" href="/basket-check-icon-white.png" />
				<link rel="apple-touch-icon" href="/basket-check-150x150-white.png" />
			</Head>

			<main>
				<Header title="Essential Groceries" />
				<Essentials />
			</main>
			<Footer />
		</div>
	)
}
