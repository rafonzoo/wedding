import { ___DEV___, ___UAT___ } from 'core/env'

export function onDevelopment(message: string) {
  if (___DEV___) throw new Error(message)
  if (___UAT___) return console.warn(message)

  return console.log(message)
}
