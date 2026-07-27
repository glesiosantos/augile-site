<template>
  <section id="planos" class="landing-section scroll-mt-20 bg-white">
    <div class="landing-container">
      <div class="landing-heading"><p class="landing-eyebrow">Planos</p><h2>Escolha o plano ideal para sua oficina</h2><p>Comece gratuitamente ou experimente os recursos do plano Básico.</p></div>
      <div v-if="carregando && !planoGratuito && !planoBasico" class="rounded-2xl border border-slate-200 p-8 text-center text-slate-600" role="status">Carregando planos...</div>
      <div v-else-if="erro && !planoGratuito && !planoBasico" class="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center text-amber-900">Não foi possível carregar os planos agora. Tente novamente em instantes.</div>
      <div v-else class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <article v-if="planoGratuito" class="flex flex-col rounded-[20px] border border-slate-200 p-7 sm:p-9"><p class="text-sm font-bold uppercase tracking-wider text-slate-500">{{ planoGratuito.titulo }}</p><p class="mt-4 text-4xl font-extrabold text-slate-950">R$ 0 <span class="text-base font-semibold text-slate-500">para sempre</span></p><p class="mt-4 text-slate-600">Para oficinas que querem começar a organizar a rotina sem custo.</p><ul class="my-7 flex-1 space-y-3"><li v-for="feature in freeFeatures" :key="feature" class="flex gap-3 text-slate-700"><LandingIcon name="check" class="mt-0.5 size-5 shrink-0 text-blue-600" />{{ feature }}</li></ul><button class="landing-button-primary w-full" @click="selectPlan('GRATUITO')">Começar grátis</button></article>
        <article v-if="planoBasico" class="relative flex flex-col rounded-[20px] border-2 border-blue-600 bg-slate-950 p-7 text-white shadow-xl shadow-blue-950/10 sm:p-9"><span class="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">Mais completo</span><p class="text-sm font-bold uppercase tracking-wider text-blue-300">{{ planoBasico.titulo }}</p><p v-if="planoBasico.temPromocao" class="mt-4 text-sm text-slate-400 line-through">R$ {{ money(planoBasico.preco) }}</p><p :class="['text-4xl font-extrabold', planoBasico.temPromocao ? 'mt-1' : 'mt-4']">R$ {{ money(planoBasico.precoFinal) }} <span class="text-base font-semibold text-slate-300">/mês</span></p><p class="mt-3 font-semibold text-blue-200">{{ trialLabel }}</p><p class="mt-4 text-slate-300">Para oficinas que precisam de mais capacidade e recursos de gestão.</p><ul class="my-7 flex-1 space-y-3"><li v-for="feature in basicFeatures" :key="feature" class="flex gap-3 text-slate-200"><span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600"><LandingIcon name="check" class="size-3.5" /></span>{{ feature }}</li></ul><button class="landing-button-primary w-full !bg-white !text-blue-700 hover:!bg-blue-50" @click="selectPlan('BASICO')">Testar plano Básico</button></article>
      </div>
      <div v-if="planoGratuito && planoBasico" class="mt-8 text-center">
        <button
          class="inline-flex min-h-11 items-center gap-2 font-bold text-blue-700 hover:text-blue-800"
          :aria-expanded="comparisonOpen"
          aria-controls="plan-comparison"
          @click="toggleComparison"
        >
          Comparar todos os recursos <LandingIcon name="chevron" :class="['size-5 transition', comparisonOpen && 'rotate-180']" />
        </button>
      </div>
      <div v-if="comparisonOpen" id="plan-comparison" class="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-slate-200"><div class="grid grid-cols-[1.2fr_.8fr_.8fr] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800"><span>Recurso</span><span>{{ planoGratuito?.titulo }}</span><span>{{ planoBasico?.titulo }}</span></div><div v-for="row in comparison" :key="row.label" class="grid grid-cols-[1.2fr_.8fr_.8fr] border-t border-slate-200 px-4 py-4 text-sm"><span class="font-semibold text-slate-700">{{ row.label }}</span><span class="text-slate-600">{{ row.free }}</span><span class="text-slate-600">{{ row.basic }}</span></div></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { TipoPlano } from '~/services/planos.service'
const store = usePlanosStore(); await store.carregar(); const { planoFree: planoGratuito, carregando, erro } = storeToRefs(store)
const planoBasico = computed(() => store.planos.find(plan => plan.tipo === 'BASICO') ?? null)
const { openSignup, track } = useLanding(); const comparisonOpen = ref(false)
const money = (value: number) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
const limit = (value: number | null | undefined, unit: string, unlimited = 'Ilimitados') => value ? `Até ${value} ${unit}` : unlimited
const freeFeatures = computed(() => planoGratuito.value ? [limit(planoGratuito.value.maxOSPorMes, 'OS por mês'), limit(planoGratuito.value.maxServicos, 'serviços'), limit(planoGratuito.value.maxUsuarios, 'usuário'), 'Clientes e veículos organizados', 'Agenda da oficina', 'Acesso pela web'] : [])
const basicFeatures = computed(() => planoBasico.value ? [limit(planoBasico.value.maxOSPorMes, 'OS por mês'), limit(planoBasico.value.maxServicos, 'serviços'), limit(planoBasico.value.maxUsuarios, 'usuários'), planoBasico.value.permiteEstoque ? 'Controle de produtos e estoque' : limit(planoBasico.value.maxProdutos, 'produtos'), planoBasico.value.permiteRelatorios ? 'Relatórios disponíveis' : 'Clientes e veículos organizados', 'Suporte pelo WhatsApp'] : [])
const trialLabel = computed(() => `${planoBasico.value?.trialDays || 14} dias grátis • sem cartão`)
const comparison = computed(() => planoGratuito.value && planoBasico.value ? [{ label: 'Ordens de serviço', free: limit(planoGratuito.value.maxOSPorMes, 'por mês'), basic: limit(planoBasico.value.maxOSPorMes, 'por mês') }, { label: 'Serviços cadastrados', free: limit(planoGratuito.value.maxServicos, ''), basic: limit(planoBasico.value.maxServicos, '') }, { label: 'Usuários', free: limit(planoGratuito.value.maxUsuarios, ''), basic: limit(planoBasico.value.maxUsuarios, '') }, { label: 'Produtos / estoque', free: planoGratuito.value.permiteEstoque ? 'Incluído' : 'Não incluído', basic: planoBasico.value.permiteEstoque ? 'Incluído' : limit(planoBasico.value.maxProdutos, '') }, { label: 'Relatórios', free: planoGratuito.value.permiteRelatorios ? 'Incluídos' : 'Não incluídos', basic: planoBasico.value.permiteRelatorios ? 'Incluídos' : 'Não incluídos' }] : [])
function selectPlan(plan: TipoPlano) { track('plan_select', { plan }); openSignup(plan, 'pricing') }
function toggleComparison() { comparisonOpen.value = !comparisonOpen.value; if (comparisonOpen.value) track('comparison_open') }
</script>
