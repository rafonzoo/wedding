// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

    const wedding = await db.wedding.create({
      data: {
        name: 'claireleon',
        location: 'located at bla...',
        story: 'our story is bla...',
        date: new Date(),
        createdAt: new Date(),
        bride: {
          create: {
            displayName: 'Claire',
            fullName: 'Claire Redfield',
            age: 27,
            order: 2,
            father: 'John',
            mother: 'Eve',
          },
        },
        groom: {
          create: {
            displayName: 'Leon',
            fullName: 'Leon S. Kennedy',
            age: 30,
            order: 1,
            father: 'Kennedy',
            mother: 'Lucia',
          },
        },
      },
      include: {
        bride: true,
        groom: true,
      },
    })

    // console.log(groom)
    // console.log(bride)
    res.status(200).json(wedding)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'prisma-error', message: 'Prisma error' })
  }
}
