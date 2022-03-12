import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
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
		<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			<List>
				{essentials.map(ess => (
					<ListItem>
						<ListItemButton>
							<ListItemText primary={ess.name} secondary={ess.preferredVendor + " " + ess.details} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
