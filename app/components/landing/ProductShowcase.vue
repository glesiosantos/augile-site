<template>
  <section id="demonstracao" class="landing-section scroll-mt-20 bg-premium text-white">
    <div class="landing-container">
      <div class="landing-heading !mx-0 !text-left"><p class="landing-eyebrow !text-blue-300">Produto no dia a dia</p><h2 class="!text-white">Veja como a Augile funciona no dia a dia</h2><p class="!text-slate-300">Conheça os recursos que ajudam a oficina a manter a rotina em ordem.</p></div>
      <div role="tablist" aria-label="Recursos da Augile" class="mb-8 flex gap-2 overflow-x-auto pb-2">
        <button
          v-for="(item, index) in showcaseItems"
          :id="`tab-${item.id}`"
          :key="item.id"
          role="tab"
          :aria-selected="active === index"
          :aria-controls="`panel-${item.id}`"
          :tabindex="active === index ? 0 : -1"
          :class="['min-h-11 shrink-0 rounded-xl px-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white', active === index ? 'bg-white text-slate-950' : 'bg-white/10 text-slate-200 hover:bg-white/15']"
          @click="active = index"
          @keydown="onTabKeydown($event, index)"
        >
          {{ item.label }}
        </button>
      </div>
      <div
        v-for="(item, index) in showcaseItems"
        v-show="active === index"
        :id="`panel-${item.id}`"
        :key="item.id"
        role="tabpanel"
        :aria-labelledby="`tab-${item.id}`"
        class="grid overflow-hidden rounded-[20px] border border-white/10 bg-white/5 lg:grid-cols-[1.1fr_.9fr]"
      >
        <div class="flex min-h-72 items-center bg-slate-100">
          <img
            :src="showcaseImages[item.id]"
            :alt="`Tela da Augile: ${item.label}`"
            class="aspect-[1920/885] h-auto w-full object-contain"
            width="1920"
            height="885"
            loading="lazy"
          >
        </div>
        <div class="p-7 sm:p-10"><h3 class="text-2xl font-bold">{{ item.title }}</h3><p class="mt-4 leading-7 text-slate-300">{{ item.description }}</p><ul class="mt-7 space-y-3"><li v-for="point in item.points" :key="point" class="flex gap-3 text-slate-200"><span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500"><LandingIcon name="check" class="size-3.5" /></span>{{ point }}</li></ul></div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import telaCliente from '~/assets/imgs/tela_cliente.png'
import telaClienteAddVeiculo from '~/assets/imgs/tela_cliente_add_veiculo.png'
import ordemServico from '~/assets/imgs/ordem_servico.png'
import cadastroProdutoEstoque from '~/assets/imgs/cadastro_produto_e_estoque.png'
import telaFornecedores from '~/assets/imgs/tela_fornecedores.png'
import { showcaseItems } from '~/data/landing'

const showcaseImages: Record<(typeof showcaseItems)[number]['id'], string> = {
  clientes: telaCliente,
  veiculos: telaClienteAddVeiculo,
  ordens: ordemServico,
  estoque: cadastroProdutoEstoque,
  fornecedores: telaFornecedores
}

const active = ref(0)
function onTabKeydown(event: KeyboardEvent, index: number) { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); if (event.key === 'Home') active.value = 0; else if (event.key === 'End') active.value = showcaseItems.length - 1; else active.value = (index + (event.key === 'ArrowRight' ? 1 : -1) + showcaseItems.length) % showcaseItems.length; nextTick(() => { const item = showcaseItems[active.value]; if (item) document.getElementById(`tab-${item.id}`)?.focus() }) }
</script>
