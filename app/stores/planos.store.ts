import { defineStore } from 'pinia'
import { carregarPlanos } from '~/services/planos.service'
import type { PlanoComPrecoFinal } from '~/services/planos.service'

export const usePlanosStore = defineStore('planos', {
  state: () => ({
    planos: [] as PlanoComPrecoFinal[],
    carregado: false,
    carregando: false,
    erro: false
  }),

  getters: {
    /** Planos pagos */
    planosPagos: state => state.planos.filter(plano => !plano.eTeste),

    /** Plano de teste */
    planoTeste: state => state.planos.find(plano => plano.eTeste)
  },

  actions: {
    async carregar() {
      if (this.carregado) return

      try {
        this.carregando = true
        this.erro = false

        this.planos = await carregarPlanos()
        this.carregado = true
      } catch (e) {
        console.error('Erro ao carregar planos', e)
        this.erro = true
      } finally {
        this.carregando = false
      }
    }
  }
})
