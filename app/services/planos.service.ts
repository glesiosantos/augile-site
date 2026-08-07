import { useApi } from '~/config/axios'

export type TipoPlano = 'GRATUITO' | 'BASICO' | 'PROFISSIONAL'

export type PlanoBase = {
  id: string
  titulo: string
  tipo: TipoPlano

  preco: number | string
  precoPromocional?: number | string | null

  maxFiliais: number
  maxUsuarios: number
  maxServicos?: number | null
  maxProdutos?: number | null
  maxOSPorMes?: number | null

  permiteEstoque: boolean
  permiteRelatorios: boolean

  trialDays?: number
  eDestaque?: boolean
  ePromocao?: boolean
}

export type PlanoComPrecoFinal = PlanoBase & {
  preco: number
  precoPromocional?: number | null
  precoFinal: number
  temPromocao: boolean
}

function normalizarPreco(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null

  const preco = typeof value === 'number' ? value : Number(value.replace(',', '.'))
  return Number.isFinite(preco) ? preco : null
}

export async function carregarPlanos(): Promise<PlanoComPrecoFinal[]> {
  const api = useApi()

  const { data } = await api.get<PlanoBase[]>('/planos')

  return data.map((plano): PlanoComPrecoFinal => {
    const preco = normalizarPreco(plano.preco) ?? 0
    const precoPromocional = normalizarPreco(plano.precoPromocional)
    const temPromocao = plano.ePromocao === true && precoPromocional !== null

    return {
      ...plano,
      preco,
      precoPromocional,
      precoFinal: temPromocao ? precoPromocional : preco,
      temPromocao
    }
  })
}
