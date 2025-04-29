const { getProducts } = require('./models/products')

// Maneja la ruta principal
const handleHome = (req, res) => {
    res.statusCode = 200;
    res.end("Bienvenid@s! Gracias por tu visita.");
}

// Maneja la ruta de productos
const handleProducts = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json; charset=utf-8')
    const products = getProducts();
    res.end(JSON.stringify(products));
}

// Maneja la ruta de contacto
const handleContact = (req, res) => {
    res.statusCode = 200;
    res.end("Escribenos al siguiente Email: hola@webserver.com :)");
}

// Maneja rutas no encontradas
const handleNotFound = (req, res) => {
    res.statusCode = 404;
    res.end("No se ha encontrado la ruta ingresada.");
}

module.exports = {
    handleHome,
    handleProducts,
    handleContact,
    handleNotFound
}