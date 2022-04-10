import styles from "./content.module.scss"

function Content({ children }) {
	return (
		<div className={styles.content}>
			{children}
		</div>
	)
}

export default Content;