import express from 'express' 
import colors from 'colors'
import cors, { CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions} from './config/swagger'
import router  from './router'
import db from './config/db'

// Conectar a base de datos
export async function connectDB() {
    try {
        console.log('NODE_TLS_REJECT_UNAUTHORIZED =', process.env.NODE_TLS_REJECT_UNAUTHORIZED)
        await db.authenticate()
        db.sync()
        console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD') )
        console.error(error)
    }
}
connectDB()

// Instancia de express
const server = express()

// Permitir Conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        // Permitimos !origin para evitar bloqueos innecesarios en ciertas peticiones
        if(!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('combined'))
server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})

// Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server