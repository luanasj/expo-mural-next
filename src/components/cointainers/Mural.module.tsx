
import styles from "./Mural.module.css"
// import smileyCouple from ""

interface MuralProps {
    // children: React.ReactNode
    mScale: number
}


const Mural: React.FC<MuralProps> = ({/*children,*/mScale=1})=>{
    return (
        <section  className={`${styles.MuralProportions} ${styles.MuralAlignment}`}>
           <div className={`${styles.muralInside}`} style={{transform : `scale(${mScale})`, backgroundImage: "url('/assets/side-view-smiley-couple-indoors.jpg')"}}></div> 
        </section>
    )
}

export default Mural