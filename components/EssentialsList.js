import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import netlifyAuth from '../pages/netlifyIdentity.js'

export default function EssentialsList() {
	const [essentials, setEssentials] = useState([])
	const [isLoading, setLoading] = useState(false)

	let headers = new Headers()
	if (netlifyAuth.isAuthenticated) {
		console.log("essentialsList.authenticated")
		headers.set("Authorization", netlifyAuth.user?.token.access_token)
	} else {
		console.log("not authenticated")
	}

	// Runs only on the first render because of the [] dependency param
	useEffect(() => {
		setLoading(true)
		fetch('/api/essentials', {'headers': headers})
		.then(res => res.json())
		.then(essentialsJSON=> {
			setEssentials(essentialsJSON)
			setLoading(false)
		})
	}, []);

	return (
		<Stack sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} spacing={2}>
			{essentials.map(ess => (
				<Card key={ess.id}>
					<ListItem>
						<ListItemButton>
							<ListItemText primary={ess.name} secondary={ess.preferredVendor + " " + ess.details} />
						</ListItemButton>
					</ListItem>
				</Card>
			))}
		</Stack>
	)
}
