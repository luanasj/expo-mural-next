'use client'

import { useState } from "react"
import ZoomBtn from "../components/buttons/ZoomBtn"
import VerticalBtnContainer from "../components/cointainers/VerticalBtnContainer"
import Mural from "../components/cointainers/Mural.module"

import "./Home.scss"


const Home : React.FC = ()=>{
    const [muralScale,setMuralScale] = useState<number>(1)

    function handleZoomIn() : void {
        setMuralScale(muralScale + 1)
    }
    
    function handleZoomOut() : void {
        setMuralScale(muralScale - 1)
    }
    

    return(
        <section className="home">
            <VerticalBtnContainer>
                <ZoomBtn text="+"  handler={handleZoomIn} />
                <ZoomBtn text="−"  handler={handleZoomOut} />
            </VerticalBtnContainer>
            
            <Mural mScale={muralScale}/>


        </section>
    )
    
}

export default Home