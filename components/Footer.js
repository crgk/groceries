import Stack from "@mui/material/Stack";

import styles from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Stack alignItems="center" justifyContent="center">
				<div className={styles.netlifyIdentityButton} data-netlify-identity-button></div>

				<p className={styles.madeWithNetlify} >Made with <img src="/netliheart.svg" alt="Netlify Logo" className={styles.logo} /> for you</p>

				<p><a className={styles.attribution} href="https://www.flaticon.com/free-icons/basket-shop" title="basket shop icons">Basket shop icons created by pictranoosa - Flaticon</a></p>
			</Stack>
		</footer>
)}
