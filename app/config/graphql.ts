import { GraphQLClient } from 'graphql-request'

export function createGraphqlClient() {
  const config = useRuntimeConfig()

  return new GraphQLClient(
    config.public.GRAPHQL_ENDPOINT
  )
}
