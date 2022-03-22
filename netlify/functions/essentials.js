import essentials from './essentials.json';

export const handler = async function (event, context) {

	const { identity, user } = context.clientContext;

	if (user?.email !== "chad@knightleow.com") {
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
