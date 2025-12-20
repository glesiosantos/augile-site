<template>
  <section class="bg-slate-900 py-20">
    <div class="max-w-5xl mx-auto px-6 text-center text-white">
      <h3 class="text-3xl md:text-4xl font-bold mb-6">
        Comece sem risco. Cancele quando quiser.
      </h3>

      <p class="text-slate-300 text-lg mb-10">
        Teste o Augile por 14 dias grátis.
        Sem cartão de crédito, sem compromisso.
      </p>

      <div class="grid sm:grid-cols-3 gap-6 mb-12">
        <div class="flex flex-col items-center gap-3">
          <span class="text-3xl">🚀</span>
          <p class="font-medium">Ativação imediata</p>
        </div>

        <div class="flex flex-col items-center gap-3">
          <span class="text-3xl">🔒</span>
          <p class="font-medium">Dados protegidos</p>
        </div>

        <div class="flex flex-col items-center gap-3">
          <span class="text-3xl">💬</span>
          <p class="font-medium">Suporte humano via WhatsApp</p>
        </div>
      </div>

      <NuxtLink
        to="/checkout?plano=free14"
        class="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg"
      >
        Começar teste grátis
      </NuxtLink>
    </div>
  </section>
</template>