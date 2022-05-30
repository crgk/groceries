import users from './users.json';
import { TodoistApi } from '@doist/todoist-api-typescript';
import faunadb from 'faunadb';

export const handler = async function (event, context) {

	const { identity, user } = context.clientContext;
	const DEBUG = false

	function getVendorLabelId(item, labels) {
		if (item.preferredVendor === undefined) {
			return ""
		}

		// Label keys in the db are just the lowercase string jammed together
		const labelKey = item.preferredVendor.replace(/\s+/g, '').toLowerCase()
		return labels[labelKey]
	}

	if (!users.includes(user?.email)) {
		console.log("invalid user: " + user?.email)
		return {
			statusCode: 401,
			body: JSON.stringify([])
		}
	}
	const tenantDomain = user.email.split("@")[1]

	const c = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})
	const q = faunadb.query
	const creds = await c.query(q.Get(
		q.Match(q.Index("creds-by-domain"), tenantDomain)
	))

	if (creds === undefined) {
		return {
			statusCode: 404,
			body: JSON.stringify({"message": "no task api credentials found"})
		}
	}

	const api = new TodoistApi(creds.data.pat)

	let items = JSON.parse(event.body)
	let errors = []
	let itemsToTasks = {}

	await Promise.allSettled(
		items.map(item => {
			let labels = [creds.data.labelId]
			const vendorLabelId = getVendorLabelId(item, creds.data.vendorLabels)
			if (vendorLabelId) {
				labels.push(vendorLabelId)
			}
			const description = `${item.details ? item.details : ""} \n${item.quantity ? item.quantity : ""}`.trim()
			return api.addTask({
				content: item.name,
				description: description,
				projectId: creds.data.projectId,
				sectionId: creds.data.sectionId,
				labelIds: labels
			}).then(response => {
				itemsToTasks[item.id] = response
			}, response => {
				let d = {message: "Failed to create task for item " + item.id}
				if (DEBUG) {
					d['error'] = response.responseData
				}
				errors.push(d)
			})
		})
	)

	if (errors.length != 0) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors)
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify(itemsToTasks)
	}
}
