<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener"
    class="fixed bottom-6 right-6 z-50 flex items-center gap-3
           bg-green-500 hover:bg-green-600
           px-5 py-3 rounded-full shadow-lg transition"
  >
    <img
      src="/assets/imgs/whatsapp.png"
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

const whatsappUrl = computed(() => {
  const number = config.public.WHATSAPP_NUMBER
  const message = encodeURIComponent(
    'Olá! Quero conhecer o Augile para minha oficina.'
  )

  return `https://wa.me/${number}?text=${message}`
})
</script>