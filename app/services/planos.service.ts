import { gql } from 'graphql-request'
import { createGraphqlClient } from '~/config/graphql'

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
  const client = createGraphqlClient()

  const query = gql`
    query {
      carregarPlanos {
        id
        titulo
        tipo
        preco
        precoPromocional
        maxFiliais
        maxUsuarios
        trialDays
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
