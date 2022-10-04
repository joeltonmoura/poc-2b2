import { QueryResult } from 'pg';
import { pool } from './poolPg';

type queryTypes = {
  instrucao: string;
  parametros?: any;
};

type InsertBd = {
  table: string;
  parametros: Array<Object>;
};

type DeleteBd = {
  table: string;
  parametros: { where: object };
};

type UpdateBd = {
  table: string;
  parametros: { set: object; where: object };
};

class ConnectDb {
  private async executarTranscao(instrucao: string, parametros: any) {
    const cliente = await pool.connect();
    try {
      await cliente.query('BEGIN');
      await cliente.query(instrucao, parametros);
      await cliente.query('COMMIT');
    } catch (e) {
      await cliente.query('ROLLBACK');
      throw e;
    } finally {
      cliente.release();
    }
  }
  public static async simplesQueryBd({
    instrucao,
    parametros,
  }: queryTypes): Promise<QueryResult<any>> {
    const start = Date.now();
    const clinte = await pool.connect();
    const res = await clinte.query(instrucao, parametros);

    //Liebra o cliente do pool para uma nova conexão
    clinte.release(true);
    const duration = Date.now() - start;
    console.log('Query executada', { instrucao, duration, rows: res.rowCount });

    return res;
  }

  public static async insertBd({ table, parametros }: InsertBd) {
    const chaves = Object.keys(parametros[0]);
    const colunas = chaves.join(',');
    const valores = chaves.map((_, i) => `$${i + 1}`).join(',');
    const query = `insert into ${table} (${colunas}) values (${valores});`;

    console.log(query);
  }

  public static async deleteBd({ table, parametros }: DeleteBd) {
    const chaves = Object.keys(parametros.where);
    const valores = chaves.map((c, i) => `${c} = $${i + 1}`).join(' and ');
    const query = `delete from ${table} where ${valores};`;

    console.log(query);
  }

  public static async updateBd({ table, parametros }: UpdateBd) {
    const chavesSet = Object.keys(parametros.where);
    const chavesWhere = Object.keys(parametros.set);
    const valoresSet = chavesSet.map((c, i) => `${c} = $${i + 1}`).join(',');
    const valoresWhere = chavesWhere.map((c, i) => `${c} = $${i + 1}`).join(' and ');

    const query = `update ${table} set ${valoresSet} where ${valoresWhere};`;
    console.log(query);
  }
}

export { ConnectDb };
