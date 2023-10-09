"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySql = void 0;
const mysql2_1 = require("mysql2");
class MySql {
    constructor(options) {
        this.options = options;
    }
    async query(raw, values) {
        try {
            this.connection = (0, mysql2_1.createConnection)(this.options);
            const response = await this.connection.promise().query(raw, values);
            return response;
        }
        catch (error) {
            console.error('MySQL ERROR: ', error);
            throw error;
        }
        finally {
            console.log('Cerrando Conexion...');
            if (this.connection)
                this.connection.end();
            console.log('Conexion cerrada.');
        }
    }
}
exports.MySql = MySql;
//# sourceMappingURL=MySql.js.map