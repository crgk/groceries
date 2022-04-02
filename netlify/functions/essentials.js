import essentials from './essentials.json';
import users from './users.json';

export const handler = async function (event, context) {

	const { identity, user } = context.clientContext;

	if (!users.includes(user?.email)) {
		console.log("invalid user: " + user?.email)
		return {
			statusCode: 401,
			body: JSON.stringify([])
		}
	}

	// Netlify Functions need to return an object with a statusCode
	// Other properties such as headers or body can also be included.
	return {
		statusCode: 200,
		body: JSON.stringify(essentials)
	}
}
