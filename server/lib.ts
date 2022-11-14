/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'

import { PrismaClient } from '@prisma/client'

let db: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>

const globalEnv = global as unknown as { prisma: typeof db }

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!globalEnv.prisma) {
    globalEnv.prisma = new PrismaClient()
  }
  db = globalEnv.prisma
}

export { db }
