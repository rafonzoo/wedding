import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from 'server/lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.wedding.findFirstOrThrow()

    // throw 'error?'
    res.status(200).json({ message: 'Connected!' })
  } catch (error) {
    res.status(200).json({ message: 'Disconnected!' })
  }
}
