<template>
  <section class="landing-section bg-slate-50">
    <div class="landing-container">
      <div class="rounded-[20px] border border-slate-200 bg-white p-7 text-center sm:p-12">
        <LandingIcon name="message" class="mx-auto size-10 text-blue-600" /><h2 class="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">A Augile está sendo construída junto com quem vive a rotina da oficina.</h2><p class="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Fale com a equipe para tirar dúvidas e compartilhar o que faria diferença no seu dia a dia.</p><a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="landing-button-secondary mt-7"
          @click="track('whatsapp_click', { location: 'pricing' })"
        >Falar no WhatsApp <LandingIcon name="external" class="size-4" /></a>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { track } = useLanding()
const whatsappUrl = computed(() => `https://wa.me/${config.public.whatsAppNumber}?text=${encodeURIComponent('Olá! Quero conhecer a Augile e conversar sobre a rotina da minha oficina.')}`)
</script>
