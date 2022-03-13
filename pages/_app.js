import '@styles/globals.css'
import netlifyIdentity from 'netlify-identity-widget';

function Application({ Component, pageProps }) {
	const netlifyAuth = {
		isAuthenticated: false,
		user: null,
		authenticate(callback) {
			this.isAuthenticated = true;
			netlifyIdentity.open();
			netlifyIdentity.on('login', user => {
				this.user = user;
				callback(user);
			});
		},
		signout(callback) {
			this.isAuthenticated = false;
			netlifyIdentity.logout();
			netlifyIdentity.on('logout', () => {
			this.user = null;
			callback();
			});
		}
	};
	return <Component {...pageProps} />
}

export default Application
