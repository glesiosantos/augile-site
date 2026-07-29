import { useApi } from '~/config/axios'

export type TipoPlano = 'GRATUITO' | 'BASICO'

export type PlanoBase = {
  id: string
  titulo: string
  tipo: TipoPlano

  preco: number
  precoPromocional?: number | null

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
  precoFinal: number
  temPromocao: boolean
}

export async function carregarPlanos(): Promise<PlanoComPrecoFinal[]> {
  const api = useApi()

  const { data } = await api.get<PlanoBase[]>('/planos')

  return data.map((plano): PlanoComPrecoFinal => {
    const temPromocao =
      plano.ePromocao === true &&
      typeof plano.precoPromocional === 'number'

    return {
      ...plano,
      precoFinal: temPromocao ? plano.precoPromocional : plano.preco,
      temPromocao
    }
  })
}
