<template>
  <section class="bg-slate-900 py-24">
    <div class="max-w-6xl mx-auto px-6 text-center text-white">
      <!-- Headline -->
      <h3 class="text-3xl md:text-4xl font-bold mb-6">
        Comece sem risco. Cancele quando quiser.
      </h3>

      <p class="text-slate-300 text-lg mb-14 max-w-3xl mx-auto">
        Experimente o Augile por
        <strong>{{ planoTeste?.trialDays ?? 14 }} dias grátis</strong>.
        Ativação imediata e acesso enviado pelo WhatsApp.
      </p>

      <!-- Benefícios -->
      <div class="grid sm:grid-cols-3 gap-8 mb-14">
        <div class="flex flex-col items-center gap-4">
          <div class="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-2xl">
            🚀
          </div>
          <p class="font-medium">
            Ativação imediata
          </p>
        </div>

        <div class="flex flex-col items-center gap-4">
          <div class="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-2xl">
            🔒
          </div>
          <p class="font-medium">
            Dados protegidos
          </p>
        </div>

        <div class="flex flex-col items-center gap-4">
          <div class="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600/20 text-blue-400 text-2xl">
            💬
          </div>
          <p class="font-medium">
            Suporte humano via WhatsApp
          </p>
        </div>
      </div>

      <!-- CTA -->
      <NuxtLink
        :to="checkoutLink"
        class="inline-flex items-center justify-center
               px-10 py-4 rounded-xl
               bg-blue-600 hover:bg-blue-700
               font-semibold text-lg
               transition-all shadow-lg hover:shadow-xl"
      >
        Começar teste grátis
      </NuxtLink>

      <!-- Microcopy -->
      <p class="mt-6 text-sm text-slate-400">
        Não exigimos cartão de crédito para o teste
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlanosStore } from '~/stores/planos.store'

const planosStore = usePlanosStore()

// garante dados (SSR + client)
await planosStore.carregar()

const { planoTeste } = storeToRefs(planosStore)

/**
 * Link dinâmico para o checkout
 * sempre usando o ID real do plano teste
 */
const checkoutLink = computed(() => {
  return planoTeste.value
    ? `/checkout?plano=${planoTeste.value.id}`
    : '/checkout'
})
</script>
