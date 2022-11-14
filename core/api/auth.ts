import type { ClientUser } from 'core/schema'

/**
 * Send user to database.
 *
 * @remark
 */
export async function RegisterUser(payload: ClientUser) {
  const config /** Dont infer type here */ = {
    url: '/api/auth/signup',
    method: 'POST',
    data: {
      ...payload,
    },
  }

  console.log(config)
  // return dofetch<ClientUser, ClientUser>({ ...config })
}
