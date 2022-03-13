import Head from 'next/head'
import Script from 'next/script'
import Header from '@components/Header'
import Footer from '@components/Footer'
import StagingArea from '@components/StagingArea'
import netlifyAuth from '../pages/netlifyIdentity.js'
import EssentialsList from '@components/EssentialsList'
import { useEffect, useState } from 'react'

export default function Home() {
	let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
	useEffect(() => {
		netlifyAuth.initialize((user) => {
			setLoggedIn(!!user)
			console.log("loggedIn: " + loggedIn)
			netlifyAuth.authenticate(() => {
				console.log("auth.loggedIn: " + loggedIn)
				console.log(netlifyAuth.user)
			})
		})
	}, [loggedIn])
	return (
		<div className="container">
			<Head>
				<title>Essential Groceries</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>

			<main>
				<Header title="Essential Groceries" />
				<StagingArea/>
				<EssentialsList/>
			</main>
			<Footer />
		</div>
	)
}
