<template>
  <section class="relative min-h-screen flex items-center">
    <!-- IMAGEM DE FUNDO -->
    <img
      src="/assets/imgs/oficina-mecanica.webp"
      class="absolute inset-0 w-full h-full object-cover"
      alt="Oficina mecânica"
    >

    <!-- OVERLAY -->
    <div class="absolute inset-0 bg-slate-900/70" />

    <!-- CONTEÚDO -->
    <div class="relative max-w-6xl mx-auto px-6 py-20 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white">
      <!-- COLUNA ESQUERDA - COPY -->
      <div class="text-center md:text-left">
        <img
          src="/imgs/augile_logo_branco_completo.png"
          alt="Augile"
          class="mx-auto mb-8 h-16"
        >

        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          Sua oficina organizada,
          <span class="text-blue-400 block">
            no controle desde o primeiro dia
          </span>
        </h1>

        <p class="text-slate-200 text-lg mb-6">
          Use o Augile gratuitamente para organizar sua oficina
          ou experimente o plano completo por 14 dias.
          Sem cartão de crédito.
        </p>

        <ul class="space-y-3 text-slate-200 mb-8 text-left md:text-left max-w-md mx-auto md:mx-0">
          <li>✔ Ordens de serviço simples e organizadas</li>
          <li>✔ Cadastro de clientes e veículos</li>
          <li>✔ Controle básico para o dia a dia da oficina</li>
          <li>✔ Evolua para estoque e relatórios quando quiser</li>
        </ul>

        <a
          href="#planos"
          class="inline-block text-blue-400 hover:underline"
        >
          Ver planos e recursos →
        </a>
      </div>

      <!-- COLUNA DIREITA - FORM -->
      <div class="bg-white rounded-xl p-8 text-slate-900 shadow-xl">
        <h2 class="text-2xl font-bold mb-2">
          Plano gratuito para sempre ou 14 dias do plano completo.
        </h2>

        <p class="text-slate-600 mb-6">
          Leva menos de 1 minuto. Sem cartão de crédito.
        </p>

        <form class="space-y-4">
          <input
            type="text"
            placeholder="CPF"
            class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
          >

          <input
            type="text"
            placeholder="Nome completo"
            class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
          >

          <input
            type="text"
            placeholder="WhatsApp (99) 99999-9999"
            class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
          >

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Começar grátis agora
          </button>

          <p class="text-xs text-center mt-2 text-green-600 font-medium">
            ✔ Plano gratuito para sempre disponível
          </p>

          <p class="text-xs text-slate-500 text-center">
            🔒 Usamos seu CPF para identificação e enviamos o acesso pelo WhatsApp.
            Sem spam. Sem compromisso.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlanosStore } from '~/stores/planos.store'

const planosStore = usePlanosStore()
await planosStore.carregar()

const { planoFree } = storeToRefs(planosStore)

const checkoutLink = computed(() =>
  planoFree.value
    ? `/checkout?plano=${planoFree.value.id}`
    : '/checkout'
)
</script>

