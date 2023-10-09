/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  createConnection,
  type Connection,
  type ConnectionOptions
} from 'mysql2';

export class MySql {
  connection: Connection;
  options: ConnectionOptions;

  constructor() {
    this.options = {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: +(process.env.MYSQL_PORT ?? 0)
    };
  }

  async query(raw: string, values: any): Promise<any> {
    try {
      this.connection = createConnection(this.options);
      const response = await this.connection.promise().query(raw, values);
      return response;
    } catch (error) {
      console.error('MySQL ERROR: ', error);
      throw error;
    } finally {
      console.log('Cerrando Conexion...');
      if (this.connection) this.connection.end();
      console.log('Conexion cerrada.');
    }
  }
}
