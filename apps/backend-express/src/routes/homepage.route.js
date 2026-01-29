import express from 'express'
import prisma from '../utils/prisma.js'
import redis from '../utils/redis.js'

const router = express.Router()

router.get('/homepage', async (req, res, next) => {
  try {
    const cacheKey = 'homepage-categories'

    const cached = await redis.get(cacheKey)
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=600')
      return res.json(JSON.parse(cached))
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

    await redis.setex(cacheKey, 600, JSON.stringify(categories))
    res.setHeader('Cache-Control', 'public, max-age=600')
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

export default router
