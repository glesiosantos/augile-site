<template>
  <div
    :class="[
      'relative rounded-xl p-8 text-center border flex flex-col',
      highlight
        ? 'bg-white text-slate-900 scale-105 shadow-xl'
        : 'border-slate-700 bg-slate-900 text-white'
    ]"
  >
    <!-- Badge destaque -->
    <span
      v-if="highlight"
      class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
    >
      Mais escolhido
    </span>

    <h3 class="text-xl font-bold mb-2">{{ title }}</h3>

    <p class="text-sm opacity-80 mb-4">
      {{ subtitle }}
    </p>

    <p class="text-4xl font-bold mb-6">
      R$ {{ price }}
      <span class="text-sm font-normal">/mês</span>
    </p>

    <!-- O que está incluso -->
    <ul class="text-sm space-y-3 mb-8 text-left">
      <li
        v-for="(item, index) in features"
        :key="index"
        class="flex gap-2"
      >
        <span class="text-green-500">✔</span>
        <span>{{ item }}</span>
      </li>
    </ul>

    <NuxtLink
      :to="`/checkout?plano=${id}`"
      class="mt-auto w-full block text-center py-3 rounded-lg font-semibold transition"
      :class="highlight
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-slate-700 hover:bg-slate-600'
      "
    >
      Assinar agora
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  title: string
  subtitle: string
  price: string
  features: string[]
  highlight?: boolean
}>()

</script>
