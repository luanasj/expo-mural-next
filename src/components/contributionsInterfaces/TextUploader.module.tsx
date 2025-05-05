import { Fragment } from "react"
import styles from "./TextUploader.module.css"
import TextEditor from "@/tools/TextEditor.module"

const TextUploader : React.FC = ()=>{
    return(
        <Fragment>
            <TextEditor/>
        </Fragment>
    )
}

export default TextUploader