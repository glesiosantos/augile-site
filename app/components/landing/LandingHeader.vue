<template>
  <header :class="['fixed inset-x-0 top-0 z-40 border-b transition', scrolled || menuOpen ? 'border-slate-200 bg-white/95 shadow-sm backdrop-blur' : 'border-transparent bg-white/90']">
    <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="#inicio" class="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" aria-label="Augile, início">
        <img src="~/assets/imgs/logo_augile_horizontal.png" alt="Augile — Gestão inteligente para oficinas" class="h-10 w-auto object-contain sm:h-12">
      </a>
      <nav class="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
        <a
          v-for="item in landingNavigation"
          :key="item.href"
          :href="item.href"
          class="text-sm font-semibold text-slate-600 hover:text-blue-700"
        >{{ item.label }}</a>
      </nav>
      <div class="hidden items-center gap-3 lg:flex">
        <a :href="appUrl" class="inline-flex min-h-11 items-center px-3 text-sm font-semibold text-slate-700 hover:text-blue-700">Entrar</a>
        <button class="landing-button-primary" @click="openSignup('BASICO', 'header')">Testar grátis por 14 dias</button>
      </div>
      <button
        class="inline-flex size-11 items-center justify-center rounded-xl text-slate-800 hover:bg-slate-100 lg:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <LandingIcon :name="menuOpen ? 'close' : 'menu'" class="size-6" />
      </button>
    </div>
    <div v-if="menuOpen" id="mobile-menu" class="border-t border-slate-200 bg-white px-4 pb-5 lg:hidden">
      <nav class="flex flex-col py-2" aria-label="Navegação mobile">
        <a
          v-for="item in landingNavigation"
          :key="item.href"
          :href="item.href"
          class="flex min-h-11 items-center rounded-lg px-3 font-semibold text-slate-700 hover:bg-slate-50"
          @click="menuOpen = false"
        >{{ item.label }}</a>
      </nav>
      <div class="grid grid-cols-2 gap-3">
        <a :href="appUrl" class="landing-button-secondary">Entrar</a>
        <button class="landing-button-primary" @click="openMobileSignup">Testar 14 dias</button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { landingNavigation } from '~/data/landing'

const config = useRuntimeConfig()
const appUrl = computed(() => String(config.public.urlAppGestor || 'https://app.augile.com.br'))
const menuOpen = ref(false)
const scrolled = ref(false)
const { openSignup } = useLanding()
function onScroll() { scrolled.value = window.scrollY > 16 }
function openMobileSignup() { menuOpen.value = false; openSignup('BASICO', 'mobile_header') }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
