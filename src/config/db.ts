import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        // Supabase/Postgres on some hosts require SSL with relaxed certificate checks in dev
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

export default db