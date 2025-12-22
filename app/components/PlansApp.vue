<template>
  <section id="planos" class="py-20 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">
        Escolha o plano ideal
      </h2>

      <!-- LOADING -->
      <div v-if="carregando" class="text-center text-slate-400">
        Carregando planos...
      </div>

      <!-- ERRO REAL -->
      <div
        v-else-if="erro && planosPagos.length === 0"
        class="text-center text-red-400"
      >
        Não foi possível carregar os planos
      </div>

      <!-- PLANOS -->
      <div
        v-else
        class="grid md:grid-cols-3 gap-8"
      >
        <PlanCard
          v-for="plano in planosPagos"
          :id="plano.id"
          :key="plano.id"
          :title="plano.titulo"
          :subtitle="`Até ${plano.maxUsuarios} usuários`"
          :price="plano.precoFinal.toFixed(2).replace('.', ',')"
          :features="[
            `${plano.maxFiliais} filial(is)`,
            `${plano.maxUsuarios} usuário(s)`,
            'Acesso web e mobile',
            'Suporte via WhatsApp'
          ]"
          :highlight="plano.eDestaque"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlanosStore } from '~/stores/planos.store'

const planosStore = usePlanosStore()

// SSR-safe: carrega apenas uma vez
await planosStore.carregar()

const { planos, carregando, erro } = storeToRefs(planosStore)

// 🔥 somente planos pagos (eTeste === false)
const planosPagos = computed(() =>
  planos.value.filter(plano => !plano.eTeste)
)
</script>
