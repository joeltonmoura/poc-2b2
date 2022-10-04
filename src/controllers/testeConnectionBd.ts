import { Request, Response } from 'express';
import { ConnectDb } from '../database';

class TesteConnectionBd {
  public static async handle(request: Request, response: Response) {
    const result = await ConnectDb.simplesQueryBd({ instrucao: 'SELECT now()' });
    await ConnectDb.insertBd({
      table: 'user',
      parametros: [{ id: 1, name: 'Joelton' }],
    });
    await ConnectDb.deleteBd({
      table: 'user',
      parametros: { where: { id: 10, name: 'joelton' } },
    });
    await ConnectDb.updateBd({
      table: 'user',
      parametros: { set: { name: 'Isso ai' }, where: { id: 10 } },
    });
    return response.status(200).json(result.rows[0]);
  }
}

export { TesteConnectionBd };
