import env from './env';
import DatabaseConnection from '../../db/connection';

let main_connection: DatabaseConnection = null;

export default function connect() {
    if (main_connection != null) {
        return main_connection;
    }

    const credentials = require(__dirname + '/../database.json')[env];

    if (process.env.DB_POOL)  {
        credentials.pool = { ...credentials.pool,  max: Number.parseInt(process.env.DB_POOL) }
    }

    main_connection = new DatabaseConnection(credentials, console);

    return main_connection
}
