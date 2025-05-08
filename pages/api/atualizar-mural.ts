import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/db/mysql'; // ajuste o caminho conforme sua estrutura

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { cellType, styles, content_url } = req.body;

  if (!cellType || !styles || !content_url) {
    return res.status(400).json({ message: 'Parâmetros faltando' });
  }

  try {
    const connection = await pool.getConnection();

    try {
      await connection.query(
        'CALL preencher_aleatorio_e_expandir(?, ?, ?)',
        [cellType, styles, content_url]
      );
      res.status(200).json({ message: 'Mural atualizado com sucesso' });
    } finally {
      connection.release();
    }

  } catch (error: any) {
    console.error('Erro ao atualizar mural:', error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
}
