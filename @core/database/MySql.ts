import { createConnection, Connection, ConnectionOptions } from "mysql2";

export class MySql {
    connection: Connection;
    options: ConnectionOptions;

    constructor(options: ConnectionOptions) {
        this.options = options
    }

    async query(raw: string, values: any): Promise<any> {
        try {
            this.connection = createConnection(this.options)
            const response = await this.connection.promise().query(raw, values);
            return response;
        } catch (error) {
            console.error('MySQL ERROR: ', error);
            throw error;
        } finally {
            console.log('Cerrando Conexion...');
            if(this.connection) this.connection.end();
            console.log('Conexion cerrada.');
            
        }
    }
}