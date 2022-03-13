import styles from './Footer.module.css'

export default function Footer() {
	return (
	<>
		<footer className={styles.footer}>
			Made with <img src="/netliheart.svg" alt="Netlify Logo" className={styles.logo} /> for you
			<a href="https://www.flaticon.com/free-icons/basket-shop" title="basket shop icons">Basket shop icons created by pictranoosa - Flaticon</a>
		</footer>
	</>
)}
