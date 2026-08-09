<template>
  <section class="bg-blue-700 py-16 text-white sm:py-20">
    <div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
      <h2 class="text-3xl font-extrabold tracking-tight sm:text-5xl">Sua oficina pode começar organizada hoje.</h2><p class="mt-5 text-lg text-blue-100">Avalie a Augile por 14 dias e escolha o plano adequado à sua rotina.</p><div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button class="landing-button-primary !bg-white !text-blue-700 hover:!bg-blue-50" @click="openSignup('BASICO', 'final_cta')">Testar grátis por 14 dias</button><a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="landing-button-secondary !border-blue-400 !bg-transparent !text-white hover:!bg-blue-600"
          @click="track('whatsapp_click', { location: 'footer' })"
        >Falar no WhatsApp</a>
      </div><p class="mt-6 text-sm font-semibold text-blue-100">14 dias para avaliar <span aria-hidden="true">•</span> sem cartão <span aria-hidden="true">•</span> cancelamento sem fidelidade</p>
    </div>
  </section>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { openSignup, track } = useLanding()
const whatsappUrl = computed(() => `https://wa.me/${config.public.whatsAppNumber}?text=${encodeURIComponent('Olá! Quero conhecer a Augile para minha oficina.')}`)
</script>
