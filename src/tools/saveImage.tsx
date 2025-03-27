export default async function saveImage(imgUrl,imageName) {
    const response = await fetch('api/save-image',{
        method: 'POST',
        body: JSON.stringify({image: imgUrl, imageName: imageName}),
        headers: {
            'Content-Type':'application/json'
        }
    })

    if(response.ok){
        console.log('Imagem salva com sucesso')
    } else {
        console.error('Falha ao salvar a imagem')
    }
}