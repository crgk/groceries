import essentials from './essentials.json';

export const handler = async function (event, context) {

	const { identity, user } = context.clientContext;

	// Netlify Functions need to return an object with a statusCode
	// Other properties such as headers or body can also be included.
	return {
		statusCode: 200,
		body: JSON.stringify(essentials)
	}
}
