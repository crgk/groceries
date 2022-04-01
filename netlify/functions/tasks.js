import todoist from './todoist.json';
import { TodoistApi } from '@doist/todoist-api-typescript'

export const handler = async function (event, context) {

	const { identity, user } = context.clientContext;
	const DEBUG = false

	if (user?.email !== "chad@knightleow.com") {
		console.log("invalid user: " + user?.email)
		return {
			statusCode: 401,
			body: JSON.stringify([])
		}
	}

	const api = new TodoistApi(todoist.pat)

	let items = JSON.parse(event.body)
	let errors = []
	let itemsToTasks = {}

	await Promise.allSettled(
		items.map(item => api.addTask({
			content: item.name,
			projectId: todoist.project
		}).then(response => {
			itemsToTasks[item.id] = response
		}, response => {
			let d = {message: "Failed to create task for item " + item.id}
			if (DEBUG) {
				d['error'] = response.responseData
			}
			errors.push(d)
		})
	))

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
