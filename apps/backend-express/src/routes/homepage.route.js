import express from 'express'
import prisma from '../utils/prisma.js'
import { getOrSetCache } from '../utils/cache.js'

const router = express.Router()

router.get('/homepage', async (req, res, next) => {
  try {
    const categories = await getOrSetCache(
      'homepage-categories',
      600,
      () =>
        prisma.category.findMany({
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
    )

    res.setHeader('Cache-Control', 'public, max-age=600')
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

export default router
