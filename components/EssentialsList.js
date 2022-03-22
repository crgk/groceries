import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import netlifyIdentity from "netlify-identity-widget";

function request(method) {
	return (url, body) => {
		let headers = new Headers()
		headers.set("Authorization", "Bearer " + netlifyIdentity.currentUser()?.token.access_token)
		return fetch(url, {
			method: method,
			body: body,
			headers: headers
		})
	}
}

export default function EssentialsList() {
	const [essentials, setEssentials] = useState([])
	const [isLoading, setLoading] = useState(false)
	const [clicked, setClicked] = useState({})

	const [ get, post ] = [ request('GET'), request('POST') ]

	useEffect(() => {
		netlifyIdentity.init()
	}, [])

	// Runs only on the first render because of the [] dependency param
	useEffect(() => {
		setLoading(true)
		get('/api/essentials')
		.then(res => res.json())
		.then(essentialsJSON => {
			setEssentials(essentialsJSON)
			setLoading(false)
		})
	}, []);

	useEffect(() => {
		let item = clicked
		if (!item.id) {
			return
		}
		post('/api/tasks', JSON.stringify(item))
		.then(res => res.json())
		.then(console.dir)
	}, [clicked]);

	return (
		<Stack sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} spacing={2}>
			{essentials.map(ess => (
				<Card key={ess.id}>
					<ListItemButton onClick={() => setClicked(ess)}>
						<ListItemText primary={ess.name} secondary={ess.preferredVendor + " " + ess.details} />
					</ListItemButton>
				</Card>
			))}
		</Stack>
	)
}
