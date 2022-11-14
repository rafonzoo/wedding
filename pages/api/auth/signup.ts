import type { RequestPayload, RequestResponse } from 'core/api'
import type { ClientUser } from 'core/schema'

import { object, string } from 'zod'

export default async (
  req: RequestPayload<ClientUser>,
  res: RequestResponse<ClientUser>
) => {
  try {
    const userValidator = object({
      email: string().email(),
      password: string().min(3),
    })

    const user = await userValidator.parseAsync(req.body)

    res.json({ message: 'Register success!', data: user })
  } catch (error) {
    res.status(500).json({ message: 'invalid' })
  }
}

export {}
