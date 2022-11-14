import type { NextPage } from 'next'

import { Navigate } from 'client/lib'

const Wedding: NextPage = () => {
  return (
    <div>
      <h1>Wedding</h1>
      <Navigate href='/akun/daftar'>Try it free</Navigate>
    </div>
  )
}

export default Wedding
