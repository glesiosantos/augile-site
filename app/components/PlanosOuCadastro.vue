<template>
  <section id="planos" class="relative py-20 bg-gradient-to-b from-white via-blue-50 to-white">
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2" />
    </div>
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

      <Transition name="fade" mode="out-in">
        <!-- ===================================================
             ETAPA 1 → PLANOS
        ==================================================== -->

        <div v-if="etapa === 'planos'" key="planos">
          <!-- ================= DESKTOP (TABELA) ================= -->
          <div class="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
            <!-- Cabeçalho -->
            <div class="grid grid-cols-3 border-b bg-slate-50">
              <div class="px-6 py-4" />

              <!-- Gratuito -->
              <div class="px-6 py-4 text-center">
                <p class="text-sm font-semibold uppercase text-slate-500">
                  {{ planoGratuito?.titulo }}
                </p>
                <p class="text-lg font-bold">
                  R$ 0 para sempre
                </p>
              </div>

              <!-- Básico -->
              <div class="px-6 py-4 text-center bg-blue-600 text-white">
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
                  R$ {{ planoBasico?.ePromocao ? planoBasico.precoPromocional : planoBasico?.preco }} / mês
                </p>
              </div>
            </div>

            <!-- Linhas -->
            <div
              v-for="row in rows"
              :key="row.label"
              class="grid grid-cols-3 border-b last:border-b-0"
            >
              <div class="px-6 py-4 flex items-center text-left text-slate-700 font-medium">
                {{ row.label }}
              </div>

              <div class="px-6 py-4 flex flex-col items-center gap-1">
                <template v-if="row.free">
                  <Check />
                  <span class="text-xs text-slate-500">{{ row.free }}</span>
                </template>
                <Close v-else />
              </div>

              <div class="px-6 py-4 flex flex-col items-center gap-1">
                <template v-if="row.basic">
                  <Check />
                  <span class="text-xs text-slate-500">{{ row.basic }}</span>
                </template>
                <Close v-else />
              </div>
            </div>

            <!-- Botões -->
            <div class="grid grid-cols-3 bg-slate-50">
              <div />

              <div class="px-6 py-4 flex justify-center">
                <a
                  href="#teste-gratis"
                  class="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-200 transition"
                >
                  Começar grátis
                </a>
              </div>

              <div class="px-6 py-4 flex justify-center">
                <button
                  v-if="planoBasico"
                  class="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  @click="iniciarTeste(planoBasico)"
                >
                  Teste por 14 dias
                </button>
              </div>
            </div>
          </div>

          <!-- ================= MOBILE (CARDS) ================= -->
          <div class="md:hidden space-y-4">
            <!-- Gratuito -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <p class="text-sm font-semibold uppercase text-slate-500 mb-2">
                {{ planoGratuito?.titulo }}
              </p>

              <p class="text-xl font-bold mb-4">
                R$ 0 para sempre
              </p>

              <ul class="space-y-2 text-sm text-slate-600 mb-6">
                <li>✔ Dashboard ilimitado</li>
                <li>✔ Clientes e veículos ilimitados</li>
                <li v-if="planoGratuito?.maxOSPorMes">
                  Até {{ planoGratuito.maxOSPorMes }} OS / mês
                </li>
              </ul>

              <a
                href="#teste-gratis"
                class="block text-center px-6 py-3 rounded-lg border border-slate-300 font-semibold"
              >
                Começar grátis
              </a>
            </div>

            <!-- Básico -->
            <div class="bg-blue-600 text-white rounded-xl shadow-sm p-6">
              <p class="text-sm font-semibold uppercase opacity-90 mb-2">
                {{ planoBasico?.titulo }}
              </p>

              <p class="text-2xl font-bold mb-4">
                R$ {{ planoBasico?.precoPromocional }} / mês
              </p>

              <ul class="space-y-2 text-sm opacity-95 mb-6">
                <li>✔ Dashboard ilimitado</li>
                <li>✔ Clientes e veículos ilimitados</li>
                <li>✔ OS ilimitadas</li>
              </ul>

              <button
                v-if="planoBasico"
                class="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold"
                @click="iniciarTeste(planoBasico)"
              >
                Teste por 14 dias
              </button>
            </div>
          </div>
        </div>

        <div
          v-else
          key="cadastro"
          class="grid md:grid-cols-2 gap-10 items-start"
        >
          <!-- Plano escolhido -->
          <div class="bg-white rounded-xl shadow-sm p-8">
            <h3 class="text-xl font-bold mb-4">
              Plano selecionado
            </h3>

            <p class="text-lg font-semibold text-blue-600 mb-2">
              {{ planoSelecionado?.titulo }}
            </p>

            <p class="text-slate-600 mb-6">
              Você terá acesso completo por 14 dias.
              Não cobramos nada agora.
            </p>

            <button
              class="text-sm text-slate-500 underline hover:text-slate-700"
              @click="voltarPlanos"
            >
              escolher outro plano
            </button>
          </div>

          <!-- Formulário -->
          <div class="bg-white rounded-xl shadow-sm p-8">
            <h3 class="text-xl font-bold mb-6">
              Criar meu acesso
            </h3>

            <form class="space-y-4" @submit.prevent="submit">
              <!-- CPF -->
              <div>
                <input
                  inputmode="numeric"
                  maxlength="14"
                  class="w-full border border-slate-300 rounded-lg px-4 py-3"
                  placeholder="CPF"
                  :value="cpf"
                  @keydown="onlyNumbers"
                  @paste.prevent="onPasteCpf"
                  @input="onCpfInput"
                >
                <p v-if="errors.cpf" class="text-red-500 text-sm mt-1">
                  {{ errors.cpf }}
                </p>
              </div>

              <!-- Nome -->
              <div>
                <input
                  v-model="nome"
                  class="w-full border border-slate-300 rounded-lg px-4 py-3"
                  placeholder="Nome completo"
                >
                <p v-if="errors.nome" class="text-red-500 text-sm mt-1">
                  {{ errors.nome }}
                </p>
              </div>

              <!-- WhatsApp -->
              <div>
                <input
                  inputmode="numeric"
                  maxlength="15"
                  class="w-full border border-slate-300 rounded-lg px-4 py-3"
                  placeholder="(99) 9.9999-9999"
                  :value="whatsapp"
                  @keydown="onlyNumbers"
                  @paste.prevent="onPasteWhatsApp"
                  @input="onWhatsAppInput"
                >
                <p v-if="errors.whatsapp" class="text-red-500 text-sm mt-1">
                  {{ errors.whatsapp }}
                </p>
              </div>

              <button
                type="submit"
                :disabled="!formularioValido"
                class="w-full py-3 rounded-lg font-semibold transition"
                :class="formularioValido
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'"
              >
                Iniciar teste gratuito
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { usePlanosStore } from '~/stores/planos.store'

import Check from './icons/Check.vue'
import Close from './icons/Close.vue'
import type { PlanoBase } from '~/services/planos.service'
import { isAxiosError } from 'axios'
import { registrarProprietario } from '~/services/proprietario.service'

const planosStore = usePlanosStore()
await planosStore.carregar()
const { planos } = storeToRefs(planosStore)

function limparFormulario() {
  cpf.value = ''
  nome.value = ''
  whatsapp.value = ''
  errors.value = {}
}

function onCpfInput(e: Event) {
  cpf.value = maskCPF((e.target as HTMLInputElement).value)

  if (cpf.value.replace(/\D/g, '').length === 11) {
    if (!isValidCPF(cpf.value)) {
      errors.value.cpf = 'CPF inválido'
    } else {
      delete errors.value.cpf
    }
  } else {
    delete errors.value.cpf
  }
}

function onlyNumbers(e: KeyboardEvent) {
  const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
  if (allowed.includes(e.key)) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

function onPasteCpf(e: ClipboardEvent) {
  cpf.value = maskCPF(e.clipboardData?.getData('text') ?? '')
}

function onPasteWhatsApp(e: ClipboardEvent) {
  whatsapp.value = maskWhatsApp(e.clipboardData?.getData('text') ?? '')
}

function onWhatsAppInput(e: Event) {
  whatsapp.value = maskWhatsApp((e.target as HTMLInputElement).value)
}

function normalizeWhatsApp(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.startsWith('55') ? digits : `55${digits}`
}

const formularioValido = computed(() => {
  if (!isValidCPF(cpf.value)) return false
  if (!nome.value) return false
  if (!whatsapp.value) return false
  if (errors.value.cpf) return false
  if (errors.value.nome) return false
  if (errors.value.whatsapp) return false

  return true
})

const etapa = ref<'planos' | 'cadastro'>('planos')
const planoSelecionado = ref<PlanoBase | null>(null)

const toast = useToast()  

const cpf = ref('')
const nome = ref('')
const whatsapp = ref('')
const errors = ref<{ cpf?: string; nome?: string; whatsapp?: string }>({})

const planoGratuito = computed(() =>
  toRaw(planos.value)?.find(p => p.tipo === 'GRATUITO')
)

const planoBasico = computed(() =>
  toRaw(planos.value)?.find(p => p.tipo === 'BASICO')
)

const rows = computed(() => {
  if (!planoGratuito.value || !planoBasico.value) return []

  return [
    { label: 'Dashboard', free: 'Ilimitadas', basic: 'Ilimitadas' },
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
      label: 'Produtos cadastrados',
      free: planoGratuito.value.maxProdutos
        ? `Até ${planoGratuito.value.maxProdutos}`
        : null,
      basic: planoBasico.value.maxProdutos
        ? `Até ${planoBasico.value.maxProdutos}`
        : 'Ilimitados'
    },
    {
      label: 'Filiais',
      free: planoGratuito.value.maxFiliais
        ? `Até ${planoGratuito.value.maxFiliais}`
        : null,
      basic: planoBasico.value.maxFiliais
        ? `Até ${planoBasico.value.maxFiliais}`
        : 0
    },
    {
      label: 'Cadastro de clientes e veículos',
      free: 'Ilimitados',
      basic: 'Ilimitados'
    },
    {
      label: 'Cadastro de Fornecedores',
      free: 'Ilimitados',
      basic: 'Ilimitados'
    }
  ]
})

function iniciarTeste(plano?: PlanoBase) {
  if (!plano) return
  planoSelecionado.value = plano
  etapa.value = 'cadastro'
}

function voltarPlanos() {
  limparFormulario()  
  etapa.value = 'planos'
  planoSelecionado.value = null
}

async function submit() {
  
  try {

    if (!planoSelecionado.value) {
      toast.error('Selecione um plano')
      return
    }

    await registrarProprietario({
      cpf: cpf.value.replace(/\D/g, ''),
      nomeCompleto: nome.value.trim(),
      whatsapp: normalizeWhatsApp(whatsapp.value),
      idPlano: planoSelecionado.value.id
    })
    toast.success('Cadastro realizado com sucesso!') 
  } catch (error: unknown) {
    let message = 'Erro ao registrar proprietário'

    if (isAxiosError(error)) {
      const backendMessage = error.response?.data?.message

      if (Array.isArray(backendMessage)) {
        message = backendMessage[0]
      } else if (backendMessage) {
        message = backendMessage
      }
    }
    toast.error(message)
  } finally {
    voltarPlanos()
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
