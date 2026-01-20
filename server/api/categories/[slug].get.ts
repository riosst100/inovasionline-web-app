import { prisma } from '../../utils/prisma'

export default defineCachedEventHandler(
  async (event) => {
    const slug = event.context.params?.slug

    if (!slug || typeof slug !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid category slug',
      })
    }

    /**
     * 1. CATEGORY + CHILDREN
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
      throw createError({
        statusCode: 404,
        statusMessage: 'Category not found',
      })
    }

    /**
     * 2. CATEGORY IDS
     */
    const categoryIds = [
      category.id,
      ...category.children.map((c) => c.id),
    ]

    /**
     * 3. VENDORS + PRODUCTS
     */
    const vendors = await prisma.vendor.findMany({
      where: {
        categoryId: {
          in: categoryIds,
        },
      },
      orderBy: {
        name: 'asc',
      },
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

    /**
     * 4. FLATTEN PRODUCTS
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
  },
  {
    maxAge: 300, // ⏱️ 5 menit
    getKey: (event) => event.context.params!.slug, // 🔑 cache per slug
  }
)
