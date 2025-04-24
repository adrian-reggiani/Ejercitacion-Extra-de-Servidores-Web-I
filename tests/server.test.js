const request = require('supertest')
const server = require('../index')
const { getProducts } = require('../src/models/products')

// Cierra el servidor después de todas las pruebas
afterAll((done) => {
  server.close(done)
})

describe('Ruta /', () => {
  test('debería devolver el mensaje de bienvenida', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe('Bienvenid@s! Gracias por tu visita.')
    expect(response.headers['content-type']).toMatch(/text\/plain/)
  })
})

describe('Ruta /productos', () => {
  test('debería devolver un array de productos en formato JSON', async () => {
    const response = await request(server).get('/productos')
    const expectedProducts = getProducts()

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body).toEqual(expectedProducts)
  })

  test('el json de productos debe tener la estructura correcta', async () => {
    const response = await request(server).get('/productos')
    const products = response.body

    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBeGreaterThan(0)

    // Verificar que cada producto tenga las propiedades requeridas
    products.forEach(product => {
      expect(product).toHaveProperty('codigo')
      expect(product).toHaveProperty('nombre')
      expect(product).toHaveProperty('importe')
      expect(product).toHaveProperty('stock')

      // Verificar tipos de datos
      expect(typeof product.codigo).toBe('string')
      expect(typeof product.nombre).toBe('string')
      expect(typeof product.importe).toBe('number')
      expect(typeof product.stock).toBe('number')
    })
  })
})

describe('Ruta /contacto', () => {
  test('debería devolver el mensaje de contacto', async () => {
    const response = await request(server).get('/contacto')
    expect(response.status).toBe(200)
    expect(response.text).toBe('Escribenos al siguiente Email: hola@webserver.com :)')
    expect(response.headers['content-type']).toMatch(/text\/plain/)
  })
})

describe('Rutas no definidas', () => {
  test('debería devolver 404 para rutas inexistentes', async () => {
    const response = await request(server).get('/ruta-que-no-existe')
    expect(response.status).toBe(404)
    expect(response.text).toBe('No se ha encontrado la ruta ingresada.')
  })

  test('debería devolver 404 para rutas con parámetros no definidos', async () => {
    const response = await request(server).get('/productos/1')
    expect(response.status).toBe(404)
  })
})
