<template>
  <div
    :class="[
      'relative rounded-2xl p-8 bg-white shadow transition-all',
      highlight
        ? 'ring-2 ring-blue-500 scale-[1.03]'
        : 'hover:shadow-lg'
    ]"
  >
    <!-- Ícone -->
    <div
      class="w-12 h-12 flex items-center justify-center rounded-xl mb-6 text-2xl"
      :class="highlight ? 'bg-blue-600 text-white' : 'bg-slate-100'"
    >
      {{ icon }}
    </div>

    <h3 class="text-xl font-bold text-slate-900 mb-3">
      {{ title }}
    </h3>

    <p class="text-slate-600 leading-relaxed">
      {{ text }}
    </p>

    <!-- Glow sutil -->
    <div
      v-if="highlight"
      class="absolute inset-0 -z-10 rounded-2xl blur-2xl bg-blue-500/10"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  text: string
  highlight?: boolean
}>()
</script>
