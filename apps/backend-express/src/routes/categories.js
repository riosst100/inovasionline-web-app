import express from 'express'
import prisma from '../utils/prisma.js'
import { getOrSetCache } from '../utils/cache.js'

const router = express.Router()

router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params

    if (!slug) {
      return res.status(400).json({ message: 'Invalid category slug' })
    }

    const cacheKey = `category-${slug}`

    const { data, cache } = await getOrSetCache(
      cacheKey,
      300,
      async () => {
        // 1️⃣ CATEGORY + CHILDREN
        const category = await prisma.category.findFirst({
          where: {
            slug,
            parentId: null,
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            seoTitle: true,
            seoDescription: true,
            children: {
              where: { isActive: true },
              orderBy: { name: 'asc' },
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        })

        if (!category) {
          return null
        }

        // 2️⃣ CATEGORY IDS (parent + children)
        const categoryIds = [
          category.id,
          ...category.children.map((c) => c.id),
        ]

        // 3️⃣ VENDORS + PRODUCTS
        const vendors = await prisma.vendor.findMany({
          where: {
            categoryId: { in: categoryIds },
          },
          orderBy: { name: 'asc' },
          select: {
            id: true,
            name: true,
            company: true,
            verified: true,
            products: {
              where: { isActive: true },
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        })

        // 4️⃣ FLATTEN PRODUCTS
        const products = vendors.flatMap((vendor) =>
          vendor.products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            vendor: {
              id: vendor.id,
              name: vendor.name,
            },
          }))
        )

        return {
          category,
          vendors,
          products,
        }
      }
    )

    if (!data) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.setHeader('X-Cache', cache)
    res.setHeader('Cache-Control', 'public, max-age=300')
    res.json(data)
  } catch (err) {
    next(err)
  }
})

export default router
