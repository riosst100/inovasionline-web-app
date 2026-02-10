import express from 'express'
import prisma from '../utils/prisma.js'
import { getOrSetCache } from '../utils/cache.js'

const router = express.Router()

router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params

    if (!slug) {
      return res.status(400).json({ message: 'Invalid seller url' })
    }

    const cacheKey = `seller-${slug}`

    const { data, cache } = await getOrSetCache(
      cacheKey,
      300,
      async () => {
        const seller = await prisma.vendor.findFirst({
          where: {
            id: slug,
          },
          select: {
            id: true,
            name: true,
            company: true,
            image: true,
            patokan: true,
            desa: true,
            kecamatan: true,
            kota: true,
            verified: true,
            products: {
              where: { isActive: true },
              orderBy: {
                name: 'asc',
              },
              select: {
                id: true,
                name: true,
                price: true,
                image: true,

                // ✅ ambil kategori produk
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true
                  }
                }
              },
            },
          },
        })

        if (!seller) {
          return null
        }

        return {
          seller
        }
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

export default router
