import { useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export default function IdentityWidget() {
	useEffect(() => {
		netlifyIdentity.init()
	}, []);
	return null
}

