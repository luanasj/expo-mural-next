'use client'

import { useState } from "react"
import ZoomBtn from "../buttons/ZoomBtn.module"
import VerticalBtnContainer from "../cointainers/VerticalBtnContainer.module"
import Mural from "../cointainers/Mural.module"

import styles from "./Home.module.css"


const Home : React.FC = ()=>{
    const [muralScale,setMuralScale] = useState<number>(1)

    function handleZoomIn() : void {
        setMuralScale(muralScale + 1)
    }
    
    function handleZoomOut() : void {
        setMuralScale(muralScale - 1)
    }
    

    return(
        <section className={`${styles.HomePropotions}`}>
            <VerticalBtnContainer>
                <ZoomBtn text="+"  op={handleZoomIn} />
                <ZoomBtn text="-"  op={handleZoomOut} />
            </VerticalBtnContainer>
            
            <Mural mScale={muralScale}/>


        </section>
    )
    
}

export default Home