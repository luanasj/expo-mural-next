// pages/api/mural.js
import  pool  from '@/db/mysql'; // Ajuste para o caminho correto
import { NextApiRequest,NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM mural ORDER BY `row-num`, `column-num`;');
      res.status(200).json(rows); // Retorna os dados para o frontend
    } catch (error) {
      console.error('Erro ao buscar mural:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
