
import "./Mural.scss"

interface MuralProps {
    mScale: number
}

const Mural: React.FC<MuralProps> = ({mScale=1})=>{
    const images = [
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg',
        '/assets/side-view-smiley-couple-indoors.jpg'
    ]

    const columns = 4
    return (
        <section  className="mural">
           <div className="content" style={{transform : `scale(${mScale})`, gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
                {images.map((url,index) =>(
                    <div key={index} className="post">
                        <img key={index} src={`${url}`} alt="" />
                    </div>
                ))}
           </div> 
        </section>
    )
}

export default Mural