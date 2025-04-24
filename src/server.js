const { getProducts } = require('./models/products')

// Maneja la ruta principal
const handleHome = (req, res) => {
}

// Maneja la ruta de productos
const handleProducts = (req, res) => {
}

// Maneja la ruta de contacto
const handleContact = (req, res) => {
}

// Maneja rutas no encontradas
const handleNotFound = (req, res) => {
}

/**
 * Crea un servidor HTTP que utiliza la función router para manejar las solicitudes
 * @returns {http.Server} Instancia del servidor HTTP
 */
function createServer () {
  const http = require('http')
  const server = http.createServer((req, res) => {
    // Maneja todas las rutas de la aplicación
    const url = req.url

    // Configurar los encabezados comunes
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    switch (url) {
      case '/':
        handleHome(req, res)
        break
      case '/productos':
        handleProducts(req, res)
        break
      case '/contacto':
        handleContact(req, res)
        break
      default:
        handleNotFound(req, res)
        break
    }
  })

  return server
}

module.exports = createServer
