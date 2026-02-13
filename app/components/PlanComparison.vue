<template>
  <section class="bg-slate-100 py-20">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Título -->
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Escolha seu plano
        </h2>
        <p class="text-slate-600 text-lg">
          Comece grátis e evolua quando sua oficina precisar.
        </p>
      </div>

      <!-- Tabela -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <!-- Cabeçalho -->
        <div class="grid grid-cols-3 border-b bg-slate-50">
          <div class="px-6 py-2" />

          <!-- Gratuito -->
          <div class="px-6 py-2 text-center">
            <p class="text-sm font-semibold uppercase text-slate-500">
              {{ planoGratuito?.titulo }}
            </p>
            <p class="text-lg font-bold">
              R$ 0 para sempre
            </p>
          </div>

          <!-- Básico -->
          <div class="px-6 py-2 text-center bg-blue-600 text-white">
            <p class="text-sm font-semibold uppercase opacity-90">
              {{ planoBasico?.titulo }}
            </p>
            <p
              v-if="planoBasico?.ePromocao"
              class="text-sm line-through opacity-80"
            >
              R$ {{ planoBasico?.preco }}
            </p>
            <p class="text-2xl font-bold">
              R$ {{ planoBasico?.precoPromocional }} / mês
            </p>
          </div>
        </div>

        <!-- Linhas -->
        <div
          v-for="row in rows"
          :key="row.label"
          class="grid grid-cols-3 border-b last:border-b-0"
        >
          <!-- Label -->
          <div class="px-6 py-4 flex items-center text-left text-slate-700 font-medium">
            {{ row.label }}
          </div>

          <!-- Gratuito -->
          <div class="px-6 py-2 flex flex-col items-center gap-0.5">
            <template v-if="row.free">
              <Check />
              <span class="text-[11px] text-slate-500">
                {{ row.free }}
              </span>
            </template>
            <template v-else>
              <div class="px-6 py-2 flex items-center justify-center">
                <Close />
              </div>
            </template>
          </div>

          <!-- Básico -->
          <div class="px-6 py-2 flex flex-col items-center gap-0.5">
            <template v-if="row.basic">
              <Check />
              <span class="text-[11px] text-slate-500">
                {{ row.basic }}
              </span>
            </template>
            <template v-else>
              <div class="px-6 py-2 flex items-center justify-center">
                <Close />
              </div>
            </template>
          </div>
        </div>

        <!-- Botões -->
        <div class="grid grid-cols-3 bg-slate-50">
          <div />

          <div class="px-6 py-2 flex justify-center">
            <a
              href="#teste-gratis"
              class="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-200 transition"
            >
              Começar grátis
            </a>
          </div>

          <div class="px-6 py-2 flex justify-center">
            <button
              class="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Teste por 14 dias
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlanosStore } from '~/stores/planos.store'

import Check from './icons/Check.vue'
import Close from './icons/Close.vue'

const planosStore = usePlanosStore()

// SSR-safe
await planosStore.carregar()

const { planos } = storeToRefs(planosStore)

/* ===============================
   PLANOS NORMALIZADOS
================================ */
const planoGratuito = computed(() =>
  toRaw(planos.value)?.find(p => p.tipo === 'GRATUITO')
)

const planoBasico = computed(() =>
  toRaw(planos.value)?.find(p => p.tipo === 'BASICO')
)

/* ===============================
   LINHAS DA TABELA
================================ */
const rows = computed(() => {
  if (!planoGratuito.value || !planoBasico.value) return []

  return [
    {
      label: 'Dashboard',
      free: 'Ilimitadas',
      basic: 'Ilimitadas'
    },
    {
      label: 'Ordens de serviço',
      free: planoGratuito.value.maxOSPorMes
        ? `Até ${planoGratuito.value.maxOSPorMes} OS / mês`
        : null,
      basic: planoBasico.value.maxOSPorMes
        ? `Até ${planoBasico.value.maxOSPorMes} OS / mês`
        : 'Ilimitadas'
    },
    {
      label: 'Serviços cadastrados',
      free: planoGratuito.value.maxServicos
        ? `Até ${planoGratuito.value.maxServicos}`
        : null,
      basic: planoBasico.value.maxServicos
        ? `Até ${planoBasico.value.maxServicos}`
        : 'Ilimitados'
    },
    {
      label: 'Cadastro de clientes e Veículos',
      free: 'Ilimitados',
      basic: 'Ilimitados'
    },
    {
      label: 'Manter Usuários da oficina',
      free: `${planoGratuito.value.maxUsuarios} usuário`,
      basic: `Até ${planoBasico.value.maxUsuarios} usuários`
    },
    {
      label: 'Manter produtos',
      free: planoGratuito.value.permiteEstoque ? 'Incluído' : null,
      basic: planoBasico.value.permiteEstoque ? 'Incluído' : '—'
    },
    {
      label: 'Trabalhar com filiais',
      free: null,
      basic: null
    }
    // {
    //   label: 'Relatórios de desempenho',
    //   free: planoGratuito.value.permiteRelatorios ? 'Incluídos' : null,
    //   basic: planoBasico.value.permiteRelatorios ? 'Incluídos' : '—'
    // }
  ]
})
</script>
