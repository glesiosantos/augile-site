<template>
  <section class="min-h-screen bg-slate-50 py-10 px-4">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
      <!-- FORMULÁRIO -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow p-8">
        <LogoAugile class="mb-6" />

        <h1 class="text-2xl font-bold mb-6">
          Finalizar assinatura
        </h1>

        <div class="grid sm:grid-cols-2 gap-4 mb-6">
          <!-- Nome -->
          <div>
            <input
              v-model="nome"
              class="w-full border rounded-lg px-4 py-3"
              placeholder="Nome completo"
            >
            <p v-if="errors.nome" class="text-red-500 text-sm mt-1">
              {{ errors.nome }}
            </p>
          </div>

          <!-- CPF -->
          <div>
            <input
              inputmode="numeric"
              autocomplete="off"
              maxlength="14"
              class="w-full border rounded-lg px-4 py-3"
              placeholder="CPF"
              :value="cpf"
              @keydown="onlyNumbersCpf"
              @paste.prevent="onPasteCpf"
              @input="onCpfInput"
            />
            <p v-if="errors.cpf" class="text-red-500 text-sm mt-1">
              {{ errors.cpf }}
            </p>
          </div>

          <!-- WhatsApp -->
          <div class="sm:col-span-2">
            <input
              inputmode="numeric"
              autocomplete="tel"
              maxlength="15"
              class="w-full border rounded-lg px-4 py-3"
              placeholder="WhatsApp (99) 99999-9999"
              :value="whatsapp"
              @keydown="onlyNumbers"
              @paste.prevent="onPasteWhatsApp"
              @input="onWhatsAppInput"
            >
            <p v-if="errors.whatsapp" class="text-red-500 text-sm mt-1">
              {{ errors.whatsapp }}
            </p>
          </div>
        </div>

        <!-- Pagamento -->
        <h2 class="font-semibold mb-3">Forma de pagamento</h2>

        <div class="space-y-3 mb-8">
          <label class="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
            <input v-model="pagamento" type="radio" value="cartao">
            <span class="font-medium">Cartão de crédito</span>
            <span class="text-sm text-slate-500 ml-auto">
              Cobrança recorrente
            </span>
          </label>

          <label class="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
            <input v-model="pagamento" type="radio" value="pix">
            <span class="font-medium">PIX</span>
            <span class="text-sm text-slate-500 ml-auto">
              Renovação mensal
            </span>
          </label>
        </div>

        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg"
          @click="submit"
        >
          Continuar para pagamento
        </button>

        <p class="text-xs text-slate-500 mt-4 text-center">
          O acesso será enviado via WhatsApp após confirmação
        </p>
      </div>

      <!-- RESUMO -->
      <aside class="bg-white rounded-xl shadow p-8 h-fit">
        <h2 class="text-lg font-bold mb-4">
          Resumo do plano
        </h2>

        <p class="font-semibold">{{ plano.nome }}</p>
        <p class="text-slate-500 mb-4">
          R$ {{ plano.preco }} / mês
        </p>

        <ul class="text-sm text-slate-600 space-y-2 mb-6">
          <li v-for="(u, i) in plano.usuarios" :key="i">
            ✔ {{ u }}
          </li>
          <li>✔ Acesso web e mobile</li>
          <li>✔ Suporte via WhatsApp</li>
        </ul>

        <div class="border-t pt-4 flex justify-between font-bold">
          <span>Total mensal</span>
          <span>R$ {{ plano.preco }}</span>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { maskCPF, isValidCPF } from '~/utils/cpf'
import { maskWhatsApp, isValidWhatsApp } from '~/utils/whatsapp'

const route = useRoute()

/* ===== Planos ===== */
const plans = {
  basico: {
    id: 'basico',
    nome: 'Básico',
    preco: '49,90',
    usuarios: ['1 proprietário', '1 colaborador']
  },
  profissional: {
    id: 'profissional',
    nome: 'Profissional',
    preco: '69,90',
    usuarios: ['1 proprietário', '5 colaboradores']
  },
  business: {
    id: 'business',
    nome: 'Business',
    preco: '99,90',
    usuarios: ['2 proprietários', '10 colaboradores']
  },
  free14: {
    id: 'free14',
    nome: 'Teste grátis 14 dias',
    preco: '0,00',
    usuarios: ['Acesso completo por 14 dias']
  }
} as const

const plano = computed(() => {
  const key = route.query.plano as keyof typeof plans
  return plans[key] ?? plans.profissional
})

/* ===== Formulário ===== */
const nome = ref('')
const cpf = ref('')
const whatsapp = ref('')
const pagamento = ref<'cartao' | 'pix'>('cartao')

const errors = ref({
  nome: '',
  cpf: '',
  whatsapp: ''
})

/* ===== Handlers ===== */
function onCpfInput(e: Event) {
  cpf.value = maskCPF((e.target as HTMLInputElement).value)
  errors.value.cpf = ''
}

function onlyNumbers(e: KeyboardEvent) {
  const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
  if (allowed.includes(e.key)) return
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

function onlyNumbersCpf(e: KeyboardEvent) {
  const allowed = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab'
  ]

  if (allowed.includes(e.key)) return

  if (!/^\d$/.test(e.key)) {
    e.preventDefault()
  }
}

function onPasteCpf(e: ClipboardEvent) {
  const pasted = e.clipboardData?.getData('text') ?? ''
  cpf.value = maskCPF(pasted)
}

function onPasteWhatsApp(e: ClipboardEvent) {
  const pasted = e.clipboardData?.getData('text') ?? ''
  whatsapp.value = maskWhatsApp(pasted)
}

function onWhatsAppInput(e: Event) {
  whatsapp.value = maskWhatsApp(
    (e.target as HTMLInputElement).value
  )
  errors.value.whatsapp = ''
}

/* ===== Validação ===== */
function validate() {
  errors.value = { nome: '', cpf: '', whatsapp: '' }

  if (nome.value.trim().split(' ').length < 2) {
    errors.value.nome = 'Informe seu nome completo'
  }

  if (!isValidCPF(cpf.value)) {
    errors.value.cpf = 'CPF inválido'
  }

  if (!isValidWhatsApp(whatsapp.value)) {
    errors.value.whatsapp = 'WhatsApp inválido'
  }

  return !errors.value.nome && !errors.value.cpf && !errors.value.whatsapp
}

function submit() {
  if (!validate()) return

  console.log({
    nome: nome.value,
    cpf: cpf.value,
    whatsapp: whatsapp.value,
    plano: plano.value.id,
    pagamento: pagamento.value
  })

  alert('Checkout validado! Pronto para integração de pagamento.')
}
</script>