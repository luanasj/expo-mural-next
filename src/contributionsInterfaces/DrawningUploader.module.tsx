import DrawningCanvas from '../tools/DrawningCanvas.module'
import styles from './DrawningUploader.module.css'

const DrawningUploader : React.FC = ()=>{
    return (
        <div className={`${styles.drawningUploaderAppearance}`}>
            <DrawningCanvas />
        </div>
    )
}

export default DrawningUploader