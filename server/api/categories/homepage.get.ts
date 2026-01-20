import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  return await prisma.category.findMany({
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
})
