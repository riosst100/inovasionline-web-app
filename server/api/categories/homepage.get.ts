import { PrismaClient } from '../../../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

export default defineEventHandler(async () => {
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

  return categories
})
