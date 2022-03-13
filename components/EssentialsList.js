import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function EssentialsList() {
	const [essentials, setEssentials] = useState([])

	// Runs only on the first render because of the [] dependency param
	useEffect(() => {
		fetch('/api/essentials')
		.then(res => res.json())
		.then(essentialsJSON=> {
			setEssentials(essentialsJSON)
		})
	}, []);

	return (
		<Stack sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} spacing={2}>
			{essentials.map(ess => (
				<Card>
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
