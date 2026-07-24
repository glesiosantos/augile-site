<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener"
    aria-label="Falar com a Augile pelo WhatsApp"
    class="fixed bottom-4 right-4 z-30 flex min-h-12 items-center gap-3 rounded-full bg-green-600 px-4 py-3 shadow-lg transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:bottom-6 sm:right-6 sm:px-5"
    @click="track('whatsapp_click', { source: 'floating_button' })"
  >
    <img
      src="~/assets/imgs/whatsapp.png"
      alt="WhatsApp"
      class="w-6 h-6"
    >

    <span class="hidden md:inline text-white font-medium">
      Falar no WhatsApp
    </span>
  </a>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { track } = useLanding()

const whatsappUrl = computed(() => {
  const number = config.public.whatsAppNumber
  const message = encodeURIComponent(
    'Olá! Quero conhecer o Augile para minha oficina.'
  )

  return `https://wa.me/${number}?text=${message}`
})
</script>
