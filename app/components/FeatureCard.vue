<template>
  <div
    :class="[
      'relative rounded-2xl p-8 bg-white shadow transition-all',
      highlight
        ? 'ring-2 ring-blue-500'
        : locked
          ? 'opacity-70'
          : 'hover:shadow-lg'
    ]"
  >
    <!-- Badge de plano -->
    <span
      v-if="badge"
      class="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
      :class="
        badge === 'Gratuito'
          ? 'bg-green-100 text-green-700'
          : 'bg-blue-100 text-blue-700'
      "
    >
      {{ badge }}
    </span>

    <!-- Ícone -->
    <div
      class="w-12 h-12 flex items-center justify-center rounded-xl mb-6 text-2xl"
      :class="
        highlight
          ? 'bg-blue-600 text-white'
          : locked
            ? 'bg-slate-200 text-slate-400'
            : 'bg-slate-100'
      "
    >
      {{ icon }}
    </div>

    <h3 class="text-xl font-bold text-slate-900 mb-3">
      {{ title }}
    </h3>

    <p class="text-slate-600 leading-relaxed">
      {{ text }}
    </p>

    <!-- Texto auxiliar -->
    <p
      v-if="helper"
      class="mt-3 text-sm font-medium"
      :class="locked ? 'text-blue-600' : 'text-slate-500'"
    >
      {{ helper }}
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
  badge?: 'Gratuito' | 'Básico'
  helper?: string
  highlight?: boolean
  locked?: boolean
}>()
</script>
