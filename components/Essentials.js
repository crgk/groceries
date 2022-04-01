import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import netlifyIdentity from "netlify-identity-widget";
import { useEffect, useRef, useState } from "react";

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

export default function Essentials() {
	const [stagedItems, setStagedItems] = useState([])
	const [essentials, setEssentials] = useState([])
	const [isLoading, setLoading] = useState(false)

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

	const submit = () => {
		post('/api/tasks', JSON.stringify(stagedItems))
		.then(res => res.json()) .then(setStagedItems([]))
	}

	const idMatches = (targetId) => (item) => {
			console.log("t: " + targetId)
			console.log("i: " + item.id)
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

	return (
		<Stack spacing={2} >
			<Button onClick={submit}>Add to list</Button>
			<Divider>STAGED</Divider>
			<Stack id="staging" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} spacing={2}>
				{Object.keys(stagedItems)
						.map(key => stagedItems[key])
						.map(item => (
					<Card key={item.id}>
						<ListItemButton
							onClick={() => unstageItem(item)}>
							<ListItemText
								primary={item.name}
								secondary={item.preferredVendor + " " + item.details} />
						</ListItemButton>
					</Card>
				))}
			</Stack>
			<Divider>UNSTAGED</Divider>
			<Stack id="essentials" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} spacing={2}>
				{essentials.map(ess => (
					<Card key={ess.id}>
						<ListItemButton onClick={() => stageItem(ess)}>
							<ListItemText primary={ess.name} secondary={ess.preferredVendor + " " + ess.details} />
						</ListItemButton>
					</Card>
				))}
			</Stack>
		</Stack>
	)
}
