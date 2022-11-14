import type { RFR } from 'client/types'

import { useClassName } from 'client/hooks'
import { forwardRef, useId } from 'react'

interface InputProps {
  placeholder: string
  helperText?: string
}

const Input: RFR<InputProps, HTMLInputElement, 'input'> = (props, ref) => {
  const { helperText, ...rest } = props
  const inputId = useId()
  const parent = useClassName([
    'relative',
    'pt-0',
    'mt-[9px]',
    'group',
    rest.className,
  ])

  return (
    <div className={parent}>
      <input
        id={inputId}
        ref={ref}
        {...rest}
        // onChange={onChange}
        className={[
          'peer',
          'flex',
          'items-center',
          'w-full',
          'py-4',
          'px-3',
          'rounded-[5px]',
          'border',
          'border-gray-400', // error ? 'border-red-600' : 'border-gray-400',
          'hover:border-black', // error ? 'hover:border-red-600' : 'hover:border-black',
          'focus:outline',
          'focus:outline-2',
          'focus:-outline-offset-2',
          'focus:outline-blue-600', // error ? 'focus:outline-red-600' : 'focus:outline-blue-600',
          '[&:not(:placeholder-shown)]:focus:invalid:outline-red-600',
          'placeholder:text-transparent',
          'disabled:bg-white',
          'disabled:border-gray-300',
          'disabled:text-gray-300',
        ].join(' ')}
      />
      <label
        htmlFor={rest.id || inputId}
        className={[
          'z-1',
          'absolute',
          'px-1',
          'top-4',
          'left-3',
          'bg-white',
          'text-gray-500', // error ? 'text-red-600' : 'text-gray-500',
          'rounded-[4px]',
          'duration-200',
          'transition-transform',
          'origin-top-left',
          'peer-placeholder-shown:scale-100',
          'peer-placeholder-shown:-translate-x-1',
          'peer-placeholder-shown:translate-y-0',
          'peer-focus:text-blue-600', // error ? 'peer-focus:text-red-600' : 'peer-focus:text-blue-600',
          'peer-focus:-translate-y-[25px]',
          'peer-focus:scale-[.7]',
          'peer-focus:-translate-x-[1px]',
          'peer-disabled:text-gray-300',
          'peer-disabled:white',
          'peer-[&:not(:disabled)]:cursor-text',
          'peer-[&:not(:placeholder-shown)]:-translate-x-[1px]',
          'peer-[&:not(:placeholder-shown)]:-translate-y-[25px]',
          'peer-[&:not(:placeholder-shown)]:scale-[.7]',
          'peer-[&:not(:placeholder-shown)]:peer-focus:peer-invalid:text-red-600',
        ].join(' ')}
      >
        {rest.placeholder}
      </label>
      <div
        className={[
          'mt-2',
          'px-3',
          'text-xs',
          'min-h-[16px]',
          'tracking-wide',
          'peer-disabled:text-gray-300',
          'text-gray-500', // error ? 'text-red-600' : 'text-gray-500',
          'peer-[&:not(:placeholder-shown)]:peer-data-[invalid]:text-red-600',
        ].join(' ')}
      >
        {helperText}
      </div>
    </div>
  )
}

export default forwardRef(Input)
