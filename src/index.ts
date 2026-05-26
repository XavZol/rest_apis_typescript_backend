import colors from 'colors'

// Allow self-signed certificates in development when connecting to DB services like Supabase
if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

import server from './server'

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))
})