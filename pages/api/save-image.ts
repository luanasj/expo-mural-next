import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '15mb',
        },
    },
};

export default function saveImageHandler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method == 'POST'){
        const {image,imageName} = req.body

        const base64Data = image.replace(/^data:image\/\w+;base64,/,'')

        const buffer = Buffer.from(base64Data,'base64')

        const filePath = path.join(process.cwd(),'public','images',`${imageName}.jpg`)

        fs.writeFile(filePath,buffer,(err)=>{
            if(err){
                console.error(err)
                return res.status(500).json({messgae: 'Erro ao salvar a imagem'})
            }
            res.status(200).json({message:'Imagem salva com sucesso'})
        })
    } else {
        res.status(405).json({message:'Método não permitido'})
}
}