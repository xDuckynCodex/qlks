import { ConnectionPool, config as SQLConfig } from "mssql";

const sqlConfig: SQLConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST || "34.124.176.204",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};
class Database {
    private static pool: ConnectionPool | null = null;

    static async getPool(): Promise<ConnectionPool> {
        if (!Database.pool) {
            try {
                Database.pool = await new ConnectionPool(sqlConfig).connect();
            } catch (error) {
                console.error("Failed to connect to DB:", error);
                throw error;
            }
        }
        return Database.pool;
    }
}

export const pool = await Database.getPool();
