<template>
  <header
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center">
        <img
          src="/assets/imgs/logo_augile_completa.png"
          alt="Augile"
          class="h-8 md:h-10 transition-all"
          :class="isScrolled ? 'opacity-100' : 'opacity-90'"
        >
      </NuxtLink>

      <!-- MENU -->
      <nav class="hidden md:flex gap-6">
        <a
          href="#planos"
          class="font-medium transition-colors"
          :class="isScrolled
            ? 'text-slate-700 hover:text-blue-600'
            : 'text-white hover:text-blue-400'
          "
        >
          Planos
        </a>

        <a
          href="#clientes"
          class="font-medium transition-colors"
          :class="isScrolled
            ? 'text-slate-700 hover:text-blue-600'
            : 'text-white hover:text-blue-400'
          "
        >
          Clientes
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
