export const isAlphabetic = (str: string): boolean => {
  if (str.length === 0) return false

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    // Check A-Z (65-90) or a-z (97-122)
    if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
      return false
    }
  }
  return true
}

export const isAlphanumeric = (str: string): boolean => {
  if (str.length === 0) return false

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    // Check A-Z (65-90), a-z (97-122), or 0-9 (48-57)
    if (
      !(code >= 65 && code <= 90) &&
      !(code >= 97 && code <= 122) &&
      !(code >= 48 && code <= 57)
    ) {
      return false
    }
  }
  return true
}
