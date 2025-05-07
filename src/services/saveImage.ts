

export default async function saveImage(imgUrl:string,imageName:string) {
    const response = await fetch('api/save-image',{
        method: 'POST',
        body: JSON.stringify({image: imgUrl, imageName: imageName}),
        headers: {
            'Content-Type':'application/json'
        }
    })

    return {
        ok: response.ok,
        message: response.ok ? 'Imagem salva com sucesso' : 'Falha ao salvar a imagem'
    }

}