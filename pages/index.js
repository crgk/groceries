import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import StagingArea from '@components/StagingArea'
import EssentialsList from '@components/EssentialsList'

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Essential Groceries</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header title="Essential Groceries" />
				<StagingArea/>
				<EssentialsList/>
			</main>
			<Footer />
		</div>
	)
}
