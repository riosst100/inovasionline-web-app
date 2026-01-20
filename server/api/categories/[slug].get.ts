import { PrismaClient } from '../../../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug

  if (!slug || typeof slug !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid category slug',
    })
  }

  /**
   * 1. CATEGORY UTAMA + CHILDREN
   */
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
        select: {
          id: true,
          name: true,
          slug: true,
        },
        orderBy: { name: 'asc' },
      },
    },
  })

  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Category not found',
    })
  }

  /**
   * 2. KUMPULKAN SEMUA CATEGORY ID
   * (parent + children)
   */
  const categoryIds = [
    category.id,
    ...category.children.map((c) => c.id),
  ]

  /**
   * 3. AMBIL SEMUA VENDOR + PRODUK
   */
  const vendors = await prisma.vendor.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
    },
    select: {
      id: true,
      name: true,
      company: true,
      verified: true,
      products: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  /**
   * 4. FLATTEN PRODUK (BIAR ENAK DI GRID)
   */
  const products = vendors.flatMap((vendor) =>
    vendor.products.map((product) => ({
      ...product,
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
})
