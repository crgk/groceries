import { Box, Container } from '@mui/material'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Essentials from '@components/Essentials'
import IdentityWidget from '@components/IdentityWidget'

export default function Home() {
	return (
		<Container maxWidth="sm">
			<Essentials />
			<Footer />
			<IdentityWidget/>
		</Container>
	)
}
