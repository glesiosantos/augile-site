import { defineStore } from 'pinia'
import type { PlanoComPrecoFinal } from '~/services/planos.service'
import { carregarPlanos } from '~/services/planos.service'

export const usePlanosStore = defineStore('planos', {
  state: () => ({
    planos: [] as PlanoComPrecoFinal[],
    carregando: false,
    erro: false
  }),

  getters: {
    planoFree: state =>
      state.planos.find(p => p.tipo === 'GRATUITO') ?? null,

    planosPagos: state =>
      state.planos.filter(p => p.tipo !== 'GRATUITO')
  },

  actions: {
    async carregar(forcarAtualizacao = false) {
      if (this.carregando) return
      if (this.planos.length && !forcarAtualizacao) return

      this.carregando = true
      this.erro = false

      try {
        this.planos = await carregarPlanos()
      } catch {
        this.erro = true
      } finally {
        this.carregando = false
      }
    }
  }
})
