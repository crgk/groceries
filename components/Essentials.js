import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";

import { IdentityContext } from "./identity-context.js";
import ItemCard from "@components/ItemCard";

function request(method) {
	const identity = useContext(IdentityContext)
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

	const submit = () => {
		post('/api/tasks', JSON.stringify(stagedItems))
		.then(res => res.json()) .then(setStagedItems([]))
	}

	const idMatches = (targetId) => (item) => {
		return item.id == targetId;
	}
	const stageItem = (toStage) => {
		if (stagedItems.some(idMatches(toStage.id)))
			return

		let s = Array.from(stagedItems)
		s.push(toStage)
		setStagedItems(s)
	}
	const unstageItem = (toUnstage) => {
			if (!stagedItems.some(idMatches(toUnstage.id)))
				return

			let s = Array.from(stagedItems)
			s.splice(s.findIndex(idMatches(toUnstage.id)), 1)
			setStagedItems(s)
	}

	function StageActions({ item }) {
		return (
			<CardActions>
				<Button size="small" onClick={() => stageItem(item)}>Stage</Button>
			</CardActions>
		)
	}

	function UnstageActions({ item }) {
		return (
			<CardActions>
				<Button size="small" onClick={() => unstageItem(item)}>Unstage</Button>
			</CardActions>
		)
	}

	return (
		<Stack
			spacing={2}
			sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
			<Button onClick={submit}>Add to list</Button>
			<Divider>STAGED</Divider>
			<Stack id="staging" spacing={2}>
				{Object.keys(stagedItems)
						.map(key => stagedItems[key])
						.map(item => (
					<ItemCard
						item={item}
						actions={<UnstageActions item={item}/>} />
				))}
			</Stack>
			<Divider>UNSTAGED</Divider>
			<Stack id="essentials" spacing={2}>
				{essentials.map(ess => (
					<ItemCard
						sx={{ width: '100%' }}
						item={ess}
						actions={<StageActions item={ess}/> } />
				))}
			</Stack>
		</Stack>
	)
}
