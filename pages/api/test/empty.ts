import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from 'server/lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.wedding.deleteMany()
    await db.bride.deleteMany()
    await db.groom.deleteMany()

    res.status(200).json({ message: 'success!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'prisma-error', message: 'Prisma error' })
  }
}
