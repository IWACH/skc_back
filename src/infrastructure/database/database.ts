import prisma from './prisma'

prisma.$connect()
  .then(() => {
    console.log('Base de datos conectada exitosamente')
  })
  .catch((error) => {
    console.error('Error conectando a la base de datos:', error)
  })

// Manejo de cierre de conexión
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

export default prisma 