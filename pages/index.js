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
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header title="Essential Groceries" />
				<Essentials/>
			</main>
			<Footer />
		</div>
	)
}
