import express from 'express'
import prisma from '../utils/prisma.js'
import cache from '../utils/cache.js'

const router = express.Router()

router.get('/homepage', async (req, res, next) => {
  try {
    const cacheKey = 'homepage-categories'
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      return res.json(cachedData)
    }

    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
        isActive: true,
        showOnHomepage: true,
      },
      orderBy: {
        homepageOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
      },
    })

    cache.set(cacheKey, categories)

    res.json(categories)
  } catch (error) {
    next(error)
  }
})

export default router
