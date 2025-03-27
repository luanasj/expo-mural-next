

const getCroppedImg = async (imageSrc,pixelCrop)=>{
    const image = new Image()
    // const reader = new FileReader();
    // const blob = await fetch(imageSrc).then(response=>{return response.blob()})

    //  reader.onloadend = ()=>{
    //     image.src = reader.result
    // }

    // reader.readAsDataURL(blob)

    
    




    // console.log(dataUrl)
  
    image.src = imageSrc
    // console.log(image)

    return new Promise<string>((resolve) => {
        image.onload = ()=>{
            const canvas = document.createElement('canvas')

            canvas.width = pixelCrop.width
            canvas.height = pixelCrop.height

            const ctx = canvas.getContext('2d') 

            // console.log(image)

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            )

            // console.log(canvas.toDataURL('image/jpeg'))

            resolve(canvas.toDataURL('image/jpeg',0.9))

            // canvas.toBlob((blob)=>{
            //     const url = URL.createObjectURL(blob)
            //     resolve(url)
            // }, 'image/jpeg')
        }
    })
}

export default getCroppedImg