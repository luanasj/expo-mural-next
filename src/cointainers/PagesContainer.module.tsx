import styles from "./PagesContainer.module.css"

interface iPagesContainer {
    children: React.ReactNode
}

const PagesContainer: React.FC<iPagesContainer> = ({children})=>{
    return (
        <main className={`${styles.pagesContainerAlignment}`}>
            {children}
        </main>
    )
}

export default PagesContainer