<template><section aria-label="Garantias para começar" class="border-y border-slate-200 bg-white"><div class="mx-auto grid max-w-7xl divide-y divide-slate-200 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8"><div v-for="item in items" :key="item.text" class="flex items-center justify-center gap-3 px-4 py-5 text-sm font-bold text-slate-700"><LandingIcon :name="item.icon" class="size-5 text-blue-600" />{{ item.text }}</div></div></section></template>
<script setup lang="ts">
const items = [{ icon: 'card', text: 'Comece sem cartão' }, { icon: 'gift', text: 'Plano gratuito disponível' }, { icon: 'message', text: 'Suporte pelo WhatsApp' }]
</script>
