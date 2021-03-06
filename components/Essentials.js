import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LocalLaundryServiceSharpIcon from '@mui/icons-material/LocalLaundryServiceSharp';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import RefreshIcon from '@mui/icons-material/Refresh';

import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";

import { IdentityContext } from "./identity-context.js";
import ItemCard from "@components/ItemCard";

function request(method) {
	const identity = useContext(IdentityContext)
	if (identity.currentUser()?.token.expires_at - Date.now() < 1000)
		identity.refresh()
	return (url, body) => {
		let headers = new Headers()
		const at = identity.currentUser()?.token.access_token
		headers.set("Authorization", "Bearer " + at)
		return fetch(url, {
			method: method,
			body: body,
			headers: headers
		})
	}
}

export default function Essentials() {
	const [stagedItems, setStagedItems] = useState([])
	const [essentials, setEssentials] = useState([])
	const [isLoading, setLoading] = useState(false)
	const identity = useContext(IdentityContext)
	const theme = useTheme()

	const [ get, post ] = [ request('GET'), request('POST') ]

	function fetchEssentials() {
		setLoading(true)
		get('/api/essentials')
		.then(res => res.json())
		.then(essentialsJSON => {
			setEssentials(essentialsJSON);
			setLoading(false);
		})
	}

	// Runs only on the first render because of the [] dependency param
	useEffect(fetchEssentials, []);
	// Runs when login state changes
	identity.on('login', fetchEssentials)
	identity.on('logout', fetchEssentials)
	identity.on('refresh', fetchEssentials)

	const resetLists = () => {
		fetchEssentials()
		setStagedItems([])
	}


	const idMatches = (targetId) => (item) => {
		return item.id == targetId;
	}
	const putTo = (array, item) => {
		if (array.some(idMatches(item.id)))
			return array

		let a = Array.from(array)
		a.push(item)
		return a
	}
	const popFrom = (array, item) => {
		if (!array.some(idMatches(item.id)))
			return

		let a = Array.from(array)
		let remove = a.findIndex(idMatches(item.id))
		a.splice(remove, 1)
		return a
	}
	const stageItem = (toStage) => {
		const s = putTo(stagedItems, toStage)
		const e = popFrom(essentials, toStage)
		setStagedItems(s)
		setEssentials(e)
	}
	const unstageItem = (toUnstage) => {
		const s = popFrom(stagedItems, toUnstage)
		const e = putTo(essentials, toUnstage)
		setStagedItems(s)
		setEssentials(e)
	}

	const submit = () => {
		post('/api/tasks', JSON.stringify(stagedItems))
		.then(res => res.json()).then(resetLists)
	}
	const wipe = () => {
		resetLists()
	}
	const laundry = () => {
		post('/api/laundry', JSON.stringify({'load': 'laundry'}))
	}
	function StageActions({ item }) {
		return (
			<CardActions>
				<Button
					variant="outlined"
					size="small"
					startIcon={<ShoppingCartIcon />}
					onClick={() => stageItem(item)}>
						Stage
					</Button>
			</CardActions>
		)
	}

	function UnstageActions({ item }) {
		return (
			<CardActions>
				<Button
					variant="outlined"
					size="small"
					startIcon={<RemoveShoppingCartIcon />}
					onClick={() => unstageItem(item)}>
						Unstage
				</Button>
			</CardActions>
		)
	}

	const gradientColors = [ "blue", "red" ]

	return (
		<Box>
		<AppBar position="static" sx={{ background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})` }}>
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>Knight-Leow</Typography>
				<IconButton
					color="inherit"
					onClick={laundry}>
						<LocalLaundryServiceSharpIcon />
				</IconButton>
				<IconButton
					color="inherit"
					onClick={wipe}>
						<RefreshIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
		<Container
			sx={{ width: '100%', maxWidth: 300 }}>
			<Divider sx={{margin:"20px"}}>STAGED</Divider>
			<Stack id="staging" spacing={2}>
				{Object.keys(stagedItems)
						.map(key => stagedItems[key])
						.map(item => (
					<ItemCard key={item.id}
						borderColor='secondary.light'
						item={item}
						actions={<UnstageActions item={item}/>} />
				))}
				<Button
					variant="contained"
					disabled={ stagedItems.length == 0 }
					onClick={submit}>
						Add to list
				</Button>
			</Stack>
			<Divider sx={{margin:"20px"}}>UNSTAGED</Divider>
			<Stack id="essentials" spacing={2}>
				{essentials.map(ess => (
					<ItemCard key={ess.id}
						borderColor='primary.light'
						item={ess}
						actions={<StageActions item={ess}/> } />
				))}
			</Stack>
		</Container>
		</Box>
	)
}
