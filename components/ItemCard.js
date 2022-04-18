import { Card, CardActions, CardActionArea, CardContent } from "@mui/material";
import { Button, Grid, Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function Extras({ item }) {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<Typography color="text.secondary" variant="subtitle2">{item.quantity}</Typography>
			</Grid>
			<Grid item xs={6}>
				<Vendor name={item.preferredVendor} />
			</Grid>
		</Grid>
	)
}

function Vendor({ name, noWrap }) {
	const vendor = name ? "@" + name : null
	return <Typography
				color="text.secondary" 
				variant="subtitle2"
				align="right"
				noWrap={noWrap} >
					{vendor?.toLowerCase().replace(" ", "-")}
			</Typography>
}

export default function ItemCard(props) {
	const item = props.item
	return (
		<Card sx={{ minWidth: 260, borderTop: 20, borderColor: props.borderColor }}>
			<CardContent>
				<Typography gutterBottom>
					{item.name}
				</Typography>
				<Extras item={item} />
			</CardContent>
			<CardActions>
				{ props.actions }
			</CardActions>
		</Card>
	)
}
