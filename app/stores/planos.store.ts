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
      state.planos.find(p => p.tipo === 'FREE') ?? null,

    planosPagos: state =>
      state.planos.filter(p => p.tipo !== 'FREE')
  },

  actions: {
    async carregar() {
      if (this.planos.length) return

      this.carregando = true
      this.erro = false

      try {
        this.planos = await carregarPlanos()
      } catch (e) {
        console.error(e)
        this.erro = true
      } finally {
        this.carregando = false
      }
    }
  }
})
