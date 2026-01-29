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
          <div class="px-6 py-3" />

          <!-- Gratuito -->
          <div class="px-6 py-3 text-center">
            <p class="text-sm font-semibold uppercase text-slate-500">
              Gratuito
            </p>
            <p class="text-lg font-bold">
              R$ 0 para sempre
            </p>
          </div>

          <!-- Básico (destaque só aqui) -->
          <div class="px-6 py-3 text-center bg-blue-600 text-white">
            <p class="text-sm font-semibold uppercase opacity-90">
              Básico
            </p>
            <p class="text-sm line-through opacity-80">
              R$ 69,90
            </p>
            <p class="text-2xl font-bold">
              R$ 49,90 / mês
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
          <div class="px-6 py-3 flex flex-col items-center gap-1">
            <template v-if="row.free">
              <Check />
              <span class="text-xs text-slate-500">
                {{ row.free }}
              </span>
            </template>
            <template v-else>
              <Close />
            </template>
          </div>

          <!-- Básico -->
          <div class="px-6 py-3 flex flex-col items-center gap-1">
            <Check />
            <span class="text-xs text-slate-500">
              {{ row.basic }}
            </span>
          </div>
        </div>

        <!-- Botões -->
        <div class="grid grid-cols-3 bg-slate-50">
          <div />

          <div class="px-6 py-3 flex justify-center">
            <button
              class="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-200 transition"
            >
              Começar grátis
            </button>
          </div>

          <div class="px-6 py-3 flex justify-center">
            <button
              class="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Testar plano básico
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Check from './icons/Check.vue'
import Close from './icons/Close.vue'

const rows = [
  {
    label: 'Ordens de serviço',
    free: 'Até 20 OS / mês',
    basic: 'Ilimitadas'
  },
  {
    label: 'Serviços cadastrados',
    free: 'Até 10',
    basic: 'Ilimitados'
  },
  {
    label: 'Usuários',
    free: '1 usuário',
    basic: 'Até 4 usuários'
  },
  {
    label: 'Estoque por serviço',
    free: null,
    basic: 'Incluído'
  },
  {
    label: 'Relatórios de desempenho',
    free: null,
    basic: 'Incluídos'
  },
  {
    label: 'Suporte',
    free: null,
    basic: 'Prioritário'
  }
]
</script>
