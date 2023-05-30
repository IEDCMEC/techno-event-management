import "dotenv/config";
import {Pool} from "pg";

function getPostgresCredentials() {

    const user = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD;
    const host = process.env.POSTGRE_HOST;
    const port = Number(process.env.POSTGRES_PORT);
    const database = process.env.POSTGRES_DATABASE;

    if (!user || user === "" || user === undefined) {
        throw new Error("Cannot find POSTGRES_USER");
    }

    if (!password || password === "" || password === undefined) {
        throw new Error("Cannot find POSTGRES_PASSWORD");
    }

    if (!host || host === "" || host === undefined) {
        throw new Error("Cannot find POSTGRE_HOST");
    }

    if (!port || port === 0 || port === undefined) {
        throw new Error("Cannot find POSTGRES_PORT");
    }

    if (!database || database === "" || database === undefined) {
        throw new Error("Cannot find POSTGRES_DATABASE");
    }

    return {
        user,
        password,
        host,
        port,
        database,
    };
}

const pg: Pool = new Pool({
    user: getPostgresCredentials().user,
    password: getPostgresCredentials().password,
    host: getPostgresCredentials().host,
    port: getPostgresCredentials().port,
    database: getPostgresCredentials().database,
    // ssl: {
    //    rejectUnauthorized: false,
    // },
});

export {pg};
