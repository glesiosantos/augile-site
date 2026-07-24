<template>
  <section id="inicio" class="relative overflow-hidden bg-slate-50 pt-28 sm:pt-32">
    <div class="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,.12),transparent_55%)]" aria-hidden="true" />
    <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:pb-24">
      <div class="max-w-2xl">
        <p class="mb-5 text-sm font-bold uppercase tracking-[.16em] text-blue-700">Gestão simples para oficinas automotivas</p>
        <h1 class="text-balance text-[clamp(2.35rem,5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-slate-950">Organize sua oficina e tenha controle de cada serviço</h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-slate-600">Ordens de serviço, clientes, veículos, agenda e serviços em um só lugar — sem planilhas e sem complicação.</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <button class="landing-button-primary sm:min-w-40" @click="primaryClick">Começar grátis</button>
          <a href="#demonstracao" class="landing-button-secondary sm:min-w-44" @click="track('showcase_click', { source: 'hero' })">Ver como funciona</a>
        </div>
        <p class="mt-4 text-sm font-medium text-slate-500">Plano gratuito para sempre <span aria-hidden="true">•</span> Sem cartão <span aria-hidden="true">•</span> Cancele quando quiser</p>
      </div>
      <div class="relative mx-auto w-full max-w-2xl">
        <div class="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-2xl shadow-blue-950/10">
          <div class="flex h-11 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4"><span class="size-2.5 rounded-full bg-slate-300" /><span class="size-2.5 rounded-full bg-slate-300" /><span class="size-2.5 rounded-full bg-slate-300" /><span class="ml-3 text-xs font-medium text-slate-500">Painel Augile</span></div>
          <img
            src="~/assets/imgs/ordem_servico.png"
            alt="Tela da Augile para criar uma ordem de serviço"
            class="aspect-[1881/885] h-auto w-full object-cover object-left-top"
            width="1881"
            height="885"
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const { openSignup, track } = useLanding()
function primaryClick() { track('cta_primary_click', { source: 'hero' }); openSignup('GRATUITO', 'hero') }
</script>
