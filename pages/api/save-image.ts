// import fs from 'fs';
// import { NextApiRequest, NextApiResponse } from 'next';
// import path from 'path';

// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: '15mb',
//         },
//     },
// };

// export default function saveImageHandler(req: NextApiRequest, res:NextApiResponse) {
//     if(req.method == 'POST'){
//         const {image,imageName} = req.body

//         const base64Data = image.replace(/^data:image\/\w+;base64,/,'')

//         const buffer = Buffer.from(base64Data,'base64')

//         const filePath = path.join(process.cwd(),'public','images',`${imageName}.jpg`)

//         fs.writeFile(filePath,buffer,(err)=>{
//             if(err){
//                 console.error(err)
//                 return res.status(500).json({messgae: 'Erro ao salvar a imagem'})
//             }
//             res.status(200).json({message:'Imagem salva com sucesso'})
//         })
//     } else {
//         res.status(405).json({message:'Método não permitido'})
// }
// }

// import type { NextApiRequest, NextApiResponse } from 'next';
// import FormData from 'form-data';
// import { Readable } from 'stream';

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '15mb',
//     },
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Método não permitido' });
//   }

//   try {
//     const { imageBase64,fileName } = req.body;

//     if (!imageBase64) {
//       return res.status(400).json({ message: 'Imagem não fornecida' });
//     }

//     // Remove prefixo e converte para buffer
//     const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
//     const buffer = Buffer.from(base64Data, 'base64');

//     // Cria form-data com o arquivo
//     const form = new FormData();
//     form.append('file', buffer, {
//         filename: `${fileName}.jpg`,
//         contentType: 'image/jpeg',
//     });

//     // Envia para CDN
//     const response = await fetch('https://cdn.icon.ufba.br/mural', {
//       method: 'POST',
//       headers: {
//         'x-api-key': 'fhDot9gQk5KVF3G',
//         ...form.getHeaders(),
//       },
//       body: form as any,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Erro ao enviar para CDN: ${errorText}`);
//     }

//     const result = await response.json();

//     return res.status(200).json({
//       message: 'Upload bem-sucedido',
//       url: result.url,
//     });
//   } catch (error: any) {
//     console.error('Erro no upload:', error);
//     return res.status(500).json({ message: 'Erro ao salvar imagem na CDN', error: error.message });
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { imageBase64, fileName } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: 'Imagem não fornecida' });
    }

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const form = new FormData();
    form.append('file', buffer, {
      filename: `${fileName}.jpg`,
      contentType: 'image/jpeg',
    });

    const response = await axios.post('https://cdn.icon.ufba.br/mural', form, {
      headers: {
        'x-api-key': 'fhDot9gQk5KVF3G',
        ...form.getHeaders(),
      },
    });

    return res.status(200).json({
      message: 'Upload bem-sucedido',
      url: response.data.url,
    });
  } catch (error: any) {
    console.error('Erro no upload:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Erro ao salvar imagem na CDN',
      error: error.response?.data || error.message,
    });
  }
}
