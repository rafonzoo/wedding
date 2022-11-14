import type { NextPage } from 'next'

import { requirePattern } from 'client/helper'
import { useField } from 'client/hooks'
import { Navigate } from 'client/lib'

import Input from 'client/components/Input'

const Signup: NextPage = () => {
  const { ref, submit, entries } = useField([
    'email',
    'password',
    'confirmPassword',
    'atm',
  ] as const)

  const handleSubmit = async () => {
    console.log(entries())
  }

  return (
    <div>
      <h1 className='text-3xl font-bold tracking-tight'>Signup</h1>
      <form
        autoComplete='off'
        className='w-[87.5%] max-w-[370px] mx-auto'
        {...submit(handleSubmit)}
      >
        <div className='flex flex-col mt-6'>
          <Input
            type='email'
            ref={ref('email')}
            required
            placeholder='Email address'
            defaultValue='w@w.c'
            helperText='::app_name:: tidak pernah memberikan email Anda kepada siapapun.'
            pattern={requirePattern('email')}
            title='Valid email address such as "a@b.id" or "my@email.com"'
            data-title={
              "Please include an '.' in the email address. ':afterAt:' is missing an '.'."
            }
          />
        </div>
        <div className='flex flex-col mt-6'>
          <Input
            type='password'
            ref={ref('password')}
            required
            pattern={requirePattern('password')}
            data-title={"Please include at least 1 ':type:' in the password."}
            title='Minimum 8 karakter dan harus mengandung setidaknya 1 huruf normal, 1 huruf kapital, 1 angka, dan 1 spesial karakter.'
            defaultValue='Password123!'
            placeholder='Password'
            helperText='Buat password Anda.'
          />
        </div>
        <div className='flex flex-col mt-6'>
          <Input
            type='password'
            ref={ref('confirmPassword', { compare: 'password' })}
            required
            placeholder='Confirm Password'
            title='Nilai harus sama persis dengan kolom password.'
            defaultValue='Password123!!'
            helperText='Ketik ulang password Anda.'
          />
        </div>
        {/* <div className='flex flex-col mt-6'>
          <Input
            type='number'
            ref={ref('atm')}
            placeholder='Some number'
            min={2}
            max={10}
          />
        </div> */}
        <div className='flex flex-col mt-6'>
          <Input
            type='datetime-local'
            ref={ref('atm')}
            defaultValue='2022-11-14T13:58'
            placeholder='Jadwal reservasi'
          />
        </div>
        <p className='mt-4'>
          <input type='submit' value='Submit' />
        </p>
      </form>

      <p>
        Already have one? <Navigate href='/akun/masuk'>Sign in!</Navigate>{' '}
      </p>
    </div>
  )
}

export default Signup
