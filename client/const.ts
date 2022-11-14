import { PATTERN } from 'core/const'

export type ValidatorRequired = keyof typeof PATTERN
export type ValidatorOptional = typeof VALIDATOR[number]
export type ValidatorKey = ValidatorRequired | ValidatorOptional

export const VALIDATOR = [
  ...(Object.keys(PATTERN) as ValidatorRequired[]),
  'atm',
  'confirmPassword',
] as const
