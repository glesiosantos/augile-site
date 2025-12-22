import { gql } from 'graphql-request'
import { createGraphqlClient } from '~/config/graphql'

/**
 * Entidade única de domínio
 */
export type PlanoBase = {
  id: string
  titulo: string
  preco: number
  precoPromocional?: number | null
  maxFiliais: number
  maxUsuarios: number
  trialDays: number
  eTeste: boolean
  eDestaque?: boolean
}

/**
 * Tipo derivado para uso na UI
 */
export type PlanoComPrecoFinal = PlanoBase & {
  precoFinal: number
}

/**
 * Regra única de preço
 */
function calcularPrecoFinal(plano: PlanoBase): number {
  const base = Number(plano.preco)
  const promo = Number(plano.precoPromocional)
  return promo > 0 ? promo : base
}

/**
 * 🔥 ÚNICA função de carregamento
 * Retorna TODOS os planos (pagos + teste)
 */
export async function carregarPlanos(): Promise<PlanoComPrecoFinal[]> {
  const client = createGraphqlClient()

  const query = gql`
    query {
      carregarPlanos {
        id
        titulo
        preco
        precoPromocional
        maxFiliais
        maxUsuarios
        trialDays
        eTeste
        eDestaque
      }
    }
  `

  const { carregarPlanos } = await client.request<{
    carregarPlanos: PlanoBase[]
  }>(query)

  return carregarPlanos.map(plano => ({
    ...plano,
    precoFinal: calcularPrecoFinal(plano)
  }))
}
