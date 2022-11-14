import type { ComponentPropsWithoutRef, FormEvent } from 'react'

import { customValidity } from 'client/helper'
import { onDevelopment } from 'core/helper'
import { useEffect, useRef } from 'react'

type FormField = FormEvent<HTMLFormElement>

type FormCallback = (e: FormField) => void | Promise<void>

export function useField<P extends string>(args: readonly P[]) {
  type FormMap = typeof args[number]
  type Fields = { input: HTMLInputElement; ref?: P }

  const fields = new Map<FormMap | undefined, Fields>()
  const { current: field } = useRef(fields)
  const abortForm = useRef(false)

  function entry(key?: FormMap) {
    return key ? field.get(key)?.input : undefined
  }

  //==============================

  function get(key: FormMap) {
    return field.get(key)?.input.value
  }

  function set(key: FormMap, value: string) {
    field.has(key) && (field.get(key)!.input.value = value)
  }

  // prettier-ignore
  function ref<T extends P>(key: T, opt?: { compare?: Exclude<P, T> } | undefined) {
    return (input: HTMLInputElement) => field.set(key, { input, ref: opt?.compare })
  }

  function entries() {
    const array = Array.from(field).map(([key, { input }]) => [
      key,
      input.value,
    ])
    return Object.fromEntries(array) as Record<FormMap, string>
  }

  function submit(callback: FormCallback): ComponentPropsWithoutRef<'form'> {
    return {
      onSubmit: (event: FormField) => onSubmit(event, callback),
      onChange,
      onInvalid,
    }
  }

  //==============================

  function onChange(event: FormField) {
    if (!(event.target instanceof HTMLInputElement)) return

    const key = Array.from(field)
      .filter(([, { input }]) => input === event.target)
      .reduce<FormMap | undefined>(
        (id, [key]) => (!id ? key : undefined),
        undefined
      )

    const referenceKey = Array.from(field)
      .filter(([keys, { ref: _ref }]) => !!_ref === !!keys)
      .reduce<FormMap | undefined>(
        (id, [key]) => (!id ? key : undefined),
        undefined
      )

    const target = entry(key)
    const instance = field.get(key)

    if (!entry(referenceKey)?.validity.valid) {
      entry(referenceKey)?.setCustomValidity('')
    }

    if (!key || !instance || !target || target.validity.valid) {
      return
    }

    // Pattern validation
    if (!instance.ref) return customValidity(target)

    if (target.validity.valueMissing || !target.validity.valid) {
      return target.setCustomValidity('')
    }

    const reference = entry(instance.ref)
    const matches = target.value === reference?.value

    matches && target.setCustomValidity('')
  }

  function onInvalid(event: FormField) {
    if (!(event.target instanceof HTMLInputElement)) return

    const key = Array.from(field)
      .filter(([, { input }]) => input === event.target)
      .reduce<FormMap | undefined>(
        (id, [key]) => (!id ? key : undefined),
        undefined
      )

    const target = entry(key)
    const instance = field.get(key)

    if (!key || !instance || !target) {
      return
    }

    // Pattern validation
    if (!instance.ref) return customValidity(target)
  }

  //==============================

  async function onSubmit(event: FormField, callbackFn: FormCallback) {
    event.preventDefault()
    try {
      const validated = await onValidate(event)
      /**
       * Don't treat reference mismatch as error.
       */
      if (validated) return callbackFn(event)
    } catch (error) {
      onDevelopment((error as Error).message)
    }
  }

  async function onValidate(event: FormEvent<HTMLFormElement>) {
    const arrayRef = Array.from(field)
    const aborted = abortForm.current

    if (aborted) {
      throw new Error(`One of attribute has been modified.`)
    }

    for (let i = 0; i < arrayRef.length; i++) {
      const [key, { input, ref: _ref }] = arrayRef[i]!
      const requireValidation = input.pattern !== ''

      // Required pattern validation
      if (requireValidation && (!input.dataset.title || input.title === '')) {
        throw new Error(
          'Using props "pattern" without providing "title" or "data-title" is forbidden.'
        )
      }

      // Reference a field value
      if (field.has(_ref)) {
        const referenceTarget = entry(_ref)
        const untitled = input.title === ''

        if (!_ref || !referenceTarget) {
          throw new Error(`Invalid reference in key "${key}"`)
        }

        if (input.value === referenceTarget.value) {
          continue
        }

        let { textContent } = referenceTarget.nextElementSibling!
        let title = input.dataset.title

        if (!title || untitled) {
          textContent = textContent === '' ? _ref : textContent
          title = `Did not match with '${textContent}'`
        }

        input.setCustomValidity(title)
        input.reportValidity()
      }
    }

    return event.currentTarget.checkValidity()
  }

  useEffect(() => {
    const config = { attributes: true }
    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        abortForm.current = mutation.type === 'attributes'
      }
    })

    field.forEach(({ input }) => observer.observe(input, config))
    return () => observer.disconnect()
  }, [field])

  return {
    ref,
    submit,
    get,
    set,
    entries,
    // handle,
  }
}
