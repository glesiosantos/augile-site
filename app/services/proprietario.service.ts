import { gql } from 'graphql-request'
import { createGraphqlClient } from '~/config/graphql'

export type RegistrarProprietarioInput = {
  cpf: string
  nomeCompleto: string
  whatsapp: string
  idPlano: string
}

export type RegistrarProprietarioResponse = {
  tenancyId: string
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE'
}

export async function registrarProprietario(
  data: RegistrarProprietarioInput
): Promise<RegistrarProprietarioResponse> {
  const client = createGraphqlClient()

  const mutation = gql`
    mutation RegistrarProprietario($data: RegistrarProprietarioTenancyInput!) {
      registrarProprietario(data: $data) {
        tenancyId
        status
      }
    }
  `

  const { registrarProprietario } = await client.request<{
    registrarProprietario: RegistrarProprietarioResponse
  }>(mutation, { data })

  return registrarProprietario
}
