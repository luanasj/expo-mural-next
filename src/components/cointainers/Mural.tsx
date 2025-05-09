import { useEffect, useState } from "react";

import "./Mural.scss"

interface MuralProps {
    mScale: number
}

interface MuralCell {
  id: number;
  'column-num': number;
  'row-num': number;
  type: string | null;
  styles: string | null;
  content_url: string | undefined;
}

const Mural: React.FC<MuralProps> = ({ mScale = 1 }) => {
  const [cells, setCells] = useState<MuralCell[]>([]);
  const [columnNum,setColumnNum] = useState<{max:number,min:number}>({max:0,min:0})

    useEffect(() => {
        fetch("/api/get-mural-content") // Rota interna no Next.js
        .then((res) => res.json())
        .then((data) => {
        setCells(data)
        console.log(data)
        const maxCol = Math.max(...data?.map((c : MuralCell) => c['column-num']));
        const minCol = Math.min(...data?.map((c : MuralCell) => c['column-num']));
        setColumnNum({max:maxCol,min:minCol})
      })
      .catch((error) => console.error("Erro ao carregar mural:", error));
    }, []);

    const pointerActionHandler = (evt: React.PointerEvent)=>{
        // evt.preventDefault()
    }
  

    return (
        <section  className="mural">
           <div className="content" onPointerDown={pointerActionHandler} onPointerMove={pointerActionHandler} onPointerUp={pointerActionHandler} style={{transform : `scale(${mScale})`, gridTemplateColumns: `repeat(${columnNum.max - columnNum.min + 1}, 1fr)`}}>
                {/* {cells?.map((cell,index) =>(
                    <div key={index} className="post">
                        <img key={index} src={`${cell.content_url}`} alt="" />
                    </div>
                ))} */}
                {/* {cells?.map((cell, index) => (
                  <div key={index} className="post">
                    {cell.type === 'image' && (
                      <div key={index} className="post">
                      <img src={cell.content_url} alt="" />
                      </div>
                    )}

                    {cell.type === 'text' && cell.content_url?.split('\n').map((line, i) => (
                      <div key={index} style={cell?.styles ? JSON.parse(cell.styles) : {}}className="post">

                        <p key={i}>
                          {line}
                          <br />
                        </p>
                      </div>

                    ))}
                  </div>
                ))} */}
                {cells?.map((cell, index) => (
              <div key={index} className="post">
                {cell.type === 'image' && (
                  <img src={cell.content_url} alt="" />
                )}

                {cell.type === 'text' && (
                  <div style={cell?.styles ? JSON.parse(cell.styles) : {}} className="post">
                    {cell.content_url?.split('\n').map((line, i) => (
                      <p key={i}>
                        {line}
                        <br />
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}



           </div> 
        </section>
    )
}

export default Mural

