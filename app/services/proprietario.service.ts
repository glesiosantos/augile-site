import { useApi } from '~/config/axios'

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
  payload: RegistrarProprietarioInput
): Promise<RegistrarProprietarioResponse> {
  const api = useApi()

  const { data } = await api.post<RegistrarProprietarioResponse>('/auth/registrar', payload)

  return data
}
