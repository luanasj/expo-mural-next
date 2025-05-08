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
        'x-api-key': process.env.CDN_API_KEY,
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
