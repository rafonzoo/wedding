export function patternValidity(target: HTMLInputElement) {
  const title = target.dataset.title || target.title

  if (target.type === 'email') {
    return target.setCustomValidity(
      title.replace(':afterAt:', target.value.replace(/\w+@/, ''))
    )
  }

  if (target.type === 'password' && target.pattern !== '') {
    const specialChars = /[~`!@#$%^&*()\-_=+[\]{};:'."|?]/
    const failAtText =
      (!/[a-z]/.test(target.value) && 'lower letter') ||
      (!/[A-Z]/.test(target.value) && 'capital letter') ||
      (!/[0-9]/.test(target.value) && 'number') ||
      (!specialChars.test(target.value) && 'special character') ||
      ''

    return target.setCustomValidity(
      failAtText !== ''
        ? title.replace(':type:', failAtText)
        : target.value.length >= 12
        ? ''
        : 'Add more characters to strength your password.'
    )
  }

  return target.setCustomValidity('')
}

export function customValidity(target: HTMLInputElement) {
  const { typeMismatch, patternMismatch } = target.validity

  if (patternMismatch && !typeMismatch) {
    return patternValidity(target)
  }

  return target.setCustomValidity('')
}
