

// export default async function saveImage(imgUrl:string,imageName:string) {
//     const response = await fetch('api/save-image',{
//         method: 'POST',
//         body: JSON.stringify({image: imgUrl, imageName: imageName}),
//         headers: {
//             'Content-Type':'application/json'
//         }
//     })

import updateMuralCell from "./updateMuralCell";

//     return {
//         ok: response.ok,
//         message: response.ok ? 'Imagem salva com sucesso' : 'Falha ao salvar a imagem'
//     }


export default async function saveImage(imgUrl:string,imageName:string) {
    const response = await fetch('/api/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: imgUrl, fileName: imageName }),
    });

    const data = await response.json();
    
    
    return await updateMuralCell('image', '{style:none}', data.url)

}