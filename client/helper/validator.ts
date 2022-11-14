import type { ValidatorRequired } from 'client/const'

import { PATTERN } from 'core/const'

export function requirePattern<P extends string>(type?: P) {
  return !type || !(type in PATTERN)
    ? undefined
    : PATTERN[type as ValidatorRequired].source
}

export function requireValidator<T extends string>(key?: T) {
  return (key && key in PATTERN) || false
}

// export function forbiddenKey(key?: ValidatorKey) {
//   return (key && !VALIDATOR.includes(key)) || false
// }
