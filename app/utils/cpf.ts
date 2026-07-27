export function maskCPF(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14)
}

export function isValidCPF(cpf: string) {
  const clean = cpf.replace(/\D/g, '')

  if (clean.length !== 11) return false
  if (/^(\d)\1+$/.test(clean)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number(clean[i]) * (10 - i)
  }

  let check = (sum * 10) % 11
  if (check === 10) check = 0
  if (check !== Number(clean[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number(clean[i]) * (11 - i)
  }

  check = (sum * 10) % 11
  if (check === 10) check = 0

  return check === Number(clean[10])
}
