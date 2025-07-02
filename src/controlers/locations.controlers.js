import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllLocations = async (req, res) => {
  try {
    const locations = await prisma.locations.findMany({
      include: {
        areas: true
      }
    })
    
    res.json(locations)
  } catch (error) {
    console.error('Error al obtener locales:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Obtener local por ID
export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params
    const location = await prisma.locations.findUnique({
      where: { location_id: parseInt(id) },
      include: {
        areas: true
      }
    })
    
    if (!location) {
      return res.status(404).json({ error: 'Local no encontrado' })
    }
    
    res.json(location)
  } catch (error) {
    console.error('Error al obtener local:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}