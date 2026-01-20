import 'dotenv/config'
import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  /**
   * =========================
   * CATEGORY UTAMA (HOMEPAGE)
   * =========================
   */
  await prisma.category.createMany({
    data: [
      {
        id: 'cat_food',
        name: 'Makanan & Minuman',
        slug: 'food-beverages',
        showOnHomepage: true,
        homepageOrder: 1,
        icon: 'food-beverages',
      },
      {
        id: 'cat_printing',
        name: 'Percetakan',
        slug: 'printing',
        showOnHomepage: true,
        homepageOrder: 2,
        icon: 'printing',
      },
      {
        id: 'cat_service',
        name: 'Jasa & Servis',
        slug: 'services',
        showOnHomepage: true,
        homepageOrder: 3,
        icon: 'services',
      },
      {
        id: 'cat_rental',
        name: 'Rental / Sewa',
        slug: 'rent',
        showOnHomepage: true,
        homepageOrder: 4,
        icon: 'rent',
      },
      {
        id: 'cat_event',
        name: 'Event / Acara',
        slug: 'events',
        showOnHomepage: true,
        homepageOrder: 5,
        icon: 'calendar',
      },
      {
        id: 'cat_ticket',
        name: 'Tiket Konser',
        slug: 'tickets',
        showOnHomepage: true,
        homepageOrder: 6,
        icon: 'ticket',
      },
      {
        id: 'cat_plants',
        name: 'Tanaman Hias',
        slug: 'plants',
        showOnHomepage: true,
        homepageOrder: 7,
        icon: 'plants',
      },
      {
        id: 'cat_pets',
        name: 'Hewan Peliharaan',
        slug: 'pets',
        showOnHomepage: true,
        homepageOrder: 8,
        icon: 'pets',
      },
    ],
    skipDuplicates: true,
  })

  /**
   * =========================
   * SUB KATEGORI – MAKANAN
   * =========================
   */
  await prisma.category.createMany({
    data: [
      {
        id: 'sub_bakso',
        name: 'Bakso',
        slug: 'bakso',
        parentId: 'cat_food',
      },
      {
        id: 'sub_mie_ayam',
        name: 'Mie Ayam',
        slug: 'mie-ayam',
        parentId: 'cat_food',
      },
      {
        id: 'sub_minuman',
        name: 'Minuman',
        slug: 'minuman',
        parentId: 'cat_food',
      },
    ],
    skipDuplicates: true,
  })

  /**
   * =========================
   * SUB KATEGORI – EVENT
   * =========================
   */
  await prisma.category.createMany({
    data: [
      {
        id: 'sub_ticket',
        name: 'Tiket Konser',
        slug: 'tiket-konser',
        parentId: 'cat_event',
      },
      {
        id: 'sub_sound',
        name: 'Sound System',
        slug: 'sound-system',
        parentId: 'cat_event',
      },
      {
        id: 'sub_stage',
        name: 'Stage',
        slug: 'stage',
        parentId: 'cat_event',
      },
    ],
    skipDuplicates: true,
  })

  /**
   * =========================
   * USERS (SELLER OWNER)
   * =========================
   */
  await prisma.user.createMany({
    data: [
      {
        id: 'user_sari',
        email: 'sari@vendor.com',
        password: 'hashed-password',
        name: 'Bu Sari',
      },
      {
        id: 'user_budi',
        email: 'budi@vendor.com',
        password: 'hashed-password',
        name: 'Pak Budi',
      },
      {
        id: 'user_rina',
        email: 'rina@vendor.com',
        password: 'hashed-password',
        name: 'Mbak Rina',
      },
    ],
    skipDuplicates: true,
  })

  /**
   * =========================
   * VENDORS
   * =========================
   */
  await prisma.vendor.createMany({
    data: [
      {
        id: 'vendor_bakso_sari',
        userId: 'user_sari',
        name: 'Dapur Bu Sari',
        verified: true,
        categoryId: 'sub_bakso',
      },
      {
        id: 'vendor_mie_budi',
        userId: 'user_budi',
        name: 'Mie Ayam Pak Budi',
        verified: true,
        categoryId: 'sub_mie_ayam',
      },
      {
        id: 'vendor_minum_rina',
        userId: 'user_rina',
        name: 'Es Segar Mbak Rina',
        verified: false,
        categoryId: 'sub_minuman',
      },
    ],
    skipDuplicates: true,
  })

  /**
   * =========================
   * PRODUCTS (FOOD)
   * =========================
   */
  await prisma.product.createMany({
    data: [
      // BAKSO
      {
        id: 'prod_bakso_urat',
        name: 'Bakso Urat',
        price: 18000,
        type: 'OTHER',
        vendorId: 'vendor_bakso_sari',
        description: 'Bakso urat sapi asli',
      },
      {
        id: 'prod_bakso_jumbo',
        name: 'Bakso Jumbo',
        price: 25000,
        type: 'OTHER',
        vendorId: 'vendor_bakso_sari',
        description: 'Bakso jumbo isi daging',
      },

      // MIE AYAM
      {
        id: 'prod_mie_original',
        name: 'Mie Ayam Original',
        price: 15000,
        type: 'OTHER',
        vendorId: 'vendor_mie_budi',
      },
      {
        id: 'prod_mie_bakso',
        name: 'Mie Ayam Bakso',
        price: 20000,
        type: 'OTHER',
        vendorId: 'vendor_mie_budi',
      },

      // MINUMAN
      {
        id: 'prod_es_teh',
        name: 'Es Teh Manis',
        price: 5000,
        type: 'OTHER',
        vendorId: 'vendor_minum_rina',
      },
      {
        id: 'prod_es_jeruk',
        name: 'Es Jeruk',
        price: 7000,
        type: 'OTHER',
        vendorId: 'vendor_minum_rina',
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Category & Sub-category seeded')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
