export default async function updateMuralCell(cellType: string, styles: any, contentUrl: string) {
    const response = await fetch('/api/atualizar-mural', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cellType,
        styles,
        content_url: contentUrl,
      }),
    });
  
    const data = await response.json();
  
    return {
      ok: response.ok,
      message: data.message || 'Erro ao atualizar o mural',
    };
  }
  