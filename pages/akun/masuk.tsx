import type { NextPage } from 'next'

import { Navigate } from 'client/lib'

const Signin: NextPage = () => {
  return (
    <div>
      <h1>Signin</h1>
      <p>
        Don`t have yet? <Navigate href='/akun/daftar'>Sign up!</Navigate>{' '}
      </p>
    </div>
  )
}

export default Signin
