import { PrismaClient } from '@prisma/client'
import uuidApiKey from 'uuid-apikey'

const prisma = new PrismaClient()

async function allProducts(req: any) {
  if (uuidApiKey.check(req.body.key, req.body.uuid)) {
    const allProducts = await prisma.product.findMany()
    await prisma.$disconnect
    return allProducts
  } else {
    return {
      "success": false,
      "message": "API Key가 일치하지 않습니다."
    }
  }
}

export default allProducts