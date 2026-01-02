import { useApi } from '~/config/axios'

export type TipoPlano = 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'

export type PlanoBase = {
  id: string
  titulo: string
  tipo: TipoPlano
  preco: number
  precoPromocional?: number | null
  maxFiliais: number
  maxUsuarios: number
  trialDays: number
}

export type PlanoComPrecoFinal = PlanoBase & {
  precoFinal: number
}

function calcularPrecoFinal(plano: PlanoBase): number {
  const base = Number(plano.preco)
  const promo = Number(plano.precoPromocional)
  return promo > 0 ? promo : base
}

export async function carregarPlanos(): Promise<PlanoComPrecoFinal[]> {
  const api = useApi()

  const { data } = await api.get<PlanoBase[]>('/planos')

  return data.map(plano => ({
    ...plano,
    precoFinal: calcularPrecoFinal(plano)
  }))
}
