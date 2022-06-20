import users from './users.json';
import { TodoistApi } from '@doist/todoist-api-typescript';
import faunadb from 'faunadb';

export const handler = async function (event, context) {

	const { identity, user } = context.clientContext;
	const DEBUG = false

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

	let load = JSON.parse(event.body).load
	let errors = []
	const steps = [
		{ name: `Wash ${load}` },
		{ name: `Dry ${load}` },
		{ name: `Fold ${load}` }
	]

	await Promise.allSettled(
		steps.map(item => {
			return api.addTask({
				content: item.name,
				dueString: 'today',
				projectId: creds.data.laundryProjectId,
				sectionId: creds.data.laundrySectionId,
				labelIds: [ creds.data.labelId ]
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
		body: "Tasks created"
	}
}
