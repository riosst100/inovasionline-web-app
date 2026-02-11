import express from 'express'
import prisma from '../utils/prisma.js'
import { getOrSetCache } from '../utils/cache.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// ===============================
// CURRENT USER SELLER (CSR only)
// ===============================
router.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET)
    } catch {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const userId = payload.id

    const vendor = await prisma.vendor.findFirst({
      where: {
        userId
      },
      select: {
        id: true,
        name: true,
        image: true,
        patokan: true,
        desa: true,
        kecamatan: true,
        kota: true,
        verified: true
      }
    })

    return res.json({ seller: vendor })
  } catch (err) {
    next(err)
  }
})

// ===============================
// SELLER INFO (ringan, untuk SSR)
// ===============================
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params

    if (!slug) {
      return res.status(400).json({ message: 'Invalid seller url' })
    }

    const cacheKey = `seller-info-${slug}`

    const { data, cache } = await getOrSetCache(
      cacheKey,
      300,
      async () => {
        const seller = await prisma.vendor.findFirst({
          where: {
            id: slug
          },
          select: {
            id: true,
            name: true,
            company: true,
            image: true,
            image_banner: true,
            patokan: true,
            desa: true,
            kecamatan: true,
            kota: true,
            verified: true
          }
        })

        if (!seller) return null

        return { seller }
      }
    )

    if (!data) {
      return res.status(404).json({ message: 'Seller not found' })
    }

    res.setHeader('X-Cache', cache)
    res.setHeader('Cache-Control', 'public, max-age=300')
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// ==================================
// SELLER PRODUCTS (berat, CSR only)
// ==================================
router.get('/:slug/products', async (req, res, next) => {
  try {
    const { slug } = req.params

    if (!slug) {
      return res.status(400).json({ message: 'Invalid seller url' })
    }

    const cacheKey = `seller-products-${slug}`

    const { data, cache } = await getOrSetCache(
      cacheKey,
      120, // boleh lebih pendek
      async () => {
        const seller = await prisma.vendor.findFirst({
          where: {
            id: slug
          },
          select: {
            products: {
              where: { isActive: true },
              orderBy: {
                name: 'asc'
              },
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true
                  }
                }
              }
            }
          }
        })

        if (!seller) return null

        return seller.products
      }
    )

    if (!data) {
      return res.status(404).json({ message: 'Seller not found' })
    }

    res.setHeader('X-Cache', cache)
    res.setHeader('Cache-Control', 'public, max-age=120')
    res.json(data)
  } catch (err) {
    next(err)
  }
})


export default router
