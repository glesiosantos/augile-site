<template>
  <section id="planos" ref="pricingSection" class="landing-section scroll-mt-20 bg-white">
    <div class="landing-container">
      <div class="landing-heading">
        <p class="landing-eyebrow">Planos</p>
        <h2>Escolha o plano ideal para sua oficina</h2>
        <p>Compare os recursos e escolha a capacidade adequada para sua rotina.</p>
      </div>

      <div v-if="carregando && !planos.length" class="rounded-2xl border border-slate-200 p-8 text-center text-slate-600" role="status">
        Carregando planos...
      </div>
      <div v-else-if="erro && !planos.length" class="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center text-amber-900">
        Não foi possível carregar os planos agora. Tente novamente em instantes.
      </div>
      <div v-else-if="!planos.length" class="rounded-2xl border border-slate-200 p-8 text-center text-slate-600">
        Nenhum plano está disponível no momento.
      </div>

      <div v-else class="mx-auto grid max-w-6xl gap-6 md:grid-cols-2" :class="planos.length >= 3 && 'xl:grid-cols-3'">
        <article
          v-for="plano in planos"
          :key="plano.id"
          :class="[
            'relative flex flex-col rounded-[20px] p-7 sm:p-9',
            plano.eDestaque
              ? 'border-2 border-blue-600 bg-slate-950 text-white shadow-xl shadow-blue-950/10'
              : 'border border-slate-200 bg-white text-slate-950'
          ]"
        >
          <span
            v-if="plano.eDestaque || plano.temPromocao"
            :class="[
              'absolute right-6 top-0 -translate-y-1/2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white',
              plano.temPromocao ? 'bg-emerald-500' : 'bg-blue-600'
            ]"
          >
            {{ plano.temPromocao ? 'Oferta especial' : 'Mais completo' }}
          </span>

          <p :class="['text-sm font-bold uppercase tracking-wider', plano.eDestaque ? 'text-blue-300' : 'text-slate-500']">
            {{ plano.titulo }}
          </p>
          <p v-if="plano.temPromocao" :class="['mt-4 text-sm', plano.eDestaque ? 'text-slate-400' : 'text-slate-500']">
            <span class="line-through">R$ {{ money(plano.preco) }}</span>
            <span class="ml-2 font-bold uppercase tracking-wide text-emerald-500">Preço promocional</span>
          </p>
          <p :class="['text-4xl font-extrabold', plano.temPromocao ? 'mt-1 text-emerald-500' : 'mt-4']">
            R$ {{ money(plano.precoFinal) }}
            <span :class="['text-base font-semibold', plano.eDestaque ? 'text-slate-300' : 'text-slate-500']">/mês</span>
          </p>
          <p :class="['mt-3 font-semibold', plano.eDestaque ? 'text-blue-200' : 'text-blue-700']">
            Teste grátis por 14 dias • sem cartão
          </p>
          <p :class="['mt-4', plano.eDestaque ? 'text-slate-300' : 'text-slate-600']">
            {{ planDescription(plano.tipo) }}
          </p>
          <ul class="my-7 flex-1 space-y-3">
            <li v-for="feature in features(plano)" :key="feature" :class="['flex gap-3', plano.eDestaque ? 'text-slate-200' : 'text-slate-700']">
              <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <LandingIcon name="check" class="size-3.5" />
              </span>
              {{ feature }}
            </li>
          </ul>
          <button
            :class="[
              'landing-button-primary w-full',
              plano.eDestaque && '!bg-white !text-blue-700 hover:!bg-blue-50'
            ]"
            @click="selectPlan(plano.tipo)"
          >
            Testar grátis por 14 dias
          </button>
        </article>
      </div>

      <div v-if="planos.length > 1" class="mt-8 text-center">
        <button
          class="inline-flex min-h-11 items-center gap-2 font-bold text-blue-700 hover:text-blue-800"
          :aria-expanded="comparisonOpen"
          aria-controls="plan-comparison"
          @click="toggleComparison"
        >
          Comparar todos os recursos
          <LandingIcon name="chevron" :class="['size-5 transition', comparisonOpen && 'rotate-180']" />
        </button>
      </div>

      <div v-if="comparisonOpen" id="plan-comparison" class="mx-auto mt-6 max-w-6xl overflow-x-auto rounded-2xl border border-slate-200">
        <div class="min-w-max">
          <div class="grid bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800" :style="comparisonGridStyle">
            <span>Recurso</span>
            <span v-for="plano in planos" :key="plano.id">{{ plano.titulo }}</span>
          </div>
          <div
            v-for="row in comparison"
            :key="row.label"
            class="grid border-t border-slate-200 px-4 py-4 text-sm"
            :style="comparisonGridStyle"
          >
            <span class="font-semibold text-slate-700">{{ row.label }}</span>
            <span v-for="(value, index) in row.values" :key="planos[index]?.id" class="text-slate-600">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { PlanoComPrecoFinal, TipoPlano } from '~/services/planos.service'

const store = usePlanosStore()
await store.carregar(true)
const { planos, carregando, erro } = storeToRefs(store)
const { openSignup, track } = useLanding()
const { trackPlanView } = useAnalytics()
const comparisonOpen = ref(false)
const pricingSection = ref<HTMLElement | null>(null)
let pricingObserver: IntersectionObserver | null = null

const money = (value: number) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
const limit = (value: number | null | undefined, unit: string, unlimited = 'Ilimitados') => value ? `Até ${value}${unit ? ` ${unit}` : ''}` : unlimited
const included = (value: boolean) => value ? 'Incluído' : 'Não incluído'

const comparisonGridStyle = computed(() => ({
  gridTemplateColumns: `minmax(180px, 1.2fr) repeat(${planos.value.length}, minmax(150px, .8fr))`
}))

const comparison = computed(() => [
  { label: 'Ordens de serviço', values: planos.value.map(plano => limit(plano.maxOSPorMes, 'por mês')) },
  { label: 'Serviços cadastrados', values: planos.value.map(plano => limit(plano.maxServicos, '')) },
  { label: 'Usuários', values: planos.value.map(plano => limit(plano.maxUsuarios, '')) },
  { label: 'Produtos / estoque', values: planos.value.map(plano => plano.permiteEstoque ? 'Incluído' : limit(plano.maxProdutos, '')) },
  { label: 'Relatórios', values: planos.value.map(plano => included(plano.permiteRelatorios)) }
])

function features(plano: PlanoComPrecoFinal) {
  return [
    limit(plano.maxOSPorMes, 'OS por mês'),
    limit(plano.maxServicos, 'serviços'),
    limit(plano.maxUsuarios, plano.maxUsuarios === 1 ? 'usuário' : 'usuários'),
    plano.permiteEstoque ? 'Controle de produtos e estoque' : limit(plano.maxProdutos, 'produtos'),
    plano.permiteRelatorios ? 'Relatórios disponíveis' : 'Clientes e veículos organizados',
    'Suporte pelo WhatsApp'
  ]
}

function planDescription(tipo: TipoPlano) {
  if (tipo === 'BASICO') return 'Para oficinas que querem organizar a rotina com os recursos essenciais.'
  if (tipo === 'PROFISSIONAL') return 'Para oficinas que precisam de mais volume e capacidade de gestão.'
  return 'Para oficinas que precisam organizar e controlar melhor a rotina.'
}

function selectPlan(plan: TipoPlano) {
  const planSlug = plan.toLowerCase()
  track('plan_selected', { plan: planSlug, source: 'pricing' })
  openSignup(plan, 'pricing')
}

function toggleComparison() {
  comparisonOpen.value = !comparisonOpen.value
  if (comparisonOpen.value) track('comparison_open')
}

onMounted(() => {
  if (!pricingSection.value) return

  pricingObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    trackPlanView({ content_name: 'Planos Augile', content_type: 'product_group' })
    pricingObserver?.disconnect()
  }, { threshold: 0.35 })

  pricingObserver.observe(pricingSection.value)
})

onBeforeUnmount(() => pricingObserver?.disconnect())
</script>
