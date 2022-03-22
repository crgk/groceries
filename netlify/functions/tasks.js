import todoist from './todoist.json';
import { TodoistApi } from '@doist/todoist-api-typescript'

export const handler = async function (event, context) {

	const { identity, user } = context.clientContext;

	if (user?.email !== "chad@knightleow.com") {
		console.log("invalid user: " + user?.email)
		return {
			statusCode: 401,
			body: JSON.stringify([])
		}
	}

	const api = new TodoistApi(todoist.pat)

	let item = JSON.parse(event.body)

	api.addTask({
		content: item.name,
		projectId: todoist.project
	})

	let taskId = "12"

	return {
		statusCode: 200,
		body: JSON.stringify({
			task: taskId
		})
	}
}
