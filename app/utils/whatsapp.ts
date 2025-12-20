export function maskWhatsApp(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits.replace(/^(\d{0,2})/, '($1')
  }

  if (digits.length <= 7) {
    return digits.replace(/^(\d{2})(\d+)/, '($1) $2')
  }

  return digits.replace(
    /^(\d{2})(\d{5})(\d{0,4})/,
    '($1) $2-$3'
  )
}

export function isValidWhatsApp(value: string) {
  return value.replace(/\D/g, '').length === 11
}
