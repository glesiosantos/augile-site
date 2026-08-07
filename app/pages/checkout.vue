<template>
  <section class="min-h-screen flex items-center bg-slate-50 px-4">
    <div class="max-w-6xl w-full mx-auto grid lg:grid-cols-3 gap-8">
      <!-- FORMULÁRIO -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 md:p-10">
        <LogoAugile class="mb-6" />

        <h1 class="text-2xl font-bold mb-6">
          {{ isTeste ? 'Ativar teste grátis' : 'Finalizar assinatura' }}
        </h1>

        <!-- LOADING -->
        <div v-if="carregando" class="text-slate-500">
          Carregando plano...
        </div>

        <!-- ERRO -->
        <div v-else-if="erro || !plano" class="text-red-500">
          Plano inválido ou indisponível
        </div>

        <!-- FORM -->
        <template v-else>
          <!-- DADOS -->
          <div class="space-y-4 mb-6">
            <div>
              <input
                inputmode="numeric"
                maxlength="14"
                class="w-full border rounded-lg px-4 py-3"
                placeholder="CPF"
                :value="cpf"
                @keydown="onlyNumbers"
                @paste.prevent="onPasteCpf"
                @input="onCpfInput"
              >
              <p v-if="errors.cpf" class="text-red-500 text-sm mt-1">{{ errors.cpf }}</p>
            </div>

            <div>
              <input
                v-model="nome"
                class="w-full border rounded-lg px-4 py-3"
                placeholder="Nome completo"
              >
              <p v-if="errors.nome" class="text-red-500 text-sm mt-1">{{ errors.nome }}</p>
            </div>

            <div>
              <input
                inputmode="numeric"
                maxlength="15"
                class="w-full border rounded-lg px-4 py-3"
                placeholder="WhatsApp (99) 99999-9999"
                :value="whatsapp"
                @keydown="onlyNumbers"
                @paste.prevent="onPasteWhatsApp"
                @input="onWhatsAppInput"
              >
              <p v-if="errors.whatsapp" class="text-red-500 text-sm mt-1">{{ errors.whatsapp }}</p>
            </div>
          </div>

          <!-- PAGAMENTO (somente se NÃO for teste) -->
          <template v-if="!isTeste">
            <h2 class="font-semibold mb-3">Forma de pagamento</h2>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                :class="[
                  'border rounded-lg p-4 text-left transition',
                  pagamento === 'cartao'
                    ? 'border-blue-600 bg-blue-50'
                    : 'hover:border-slate-400'
                ]"
                @click="pagamento = 'cartao'"
              >
                <p class="font-medium">Cartão de crédito</p>
                <p class="text-sm text-slate-500">Cobrança recorrente</p>
              </button>

              <button
                type="button"
                :class="[
                  'border rounded-lg p-4 text-left transition',
                  pagamento === 'pix'
                    ? 'border-blue-600 bg-blue-50'
                    : 'hover:border-slate-400'
                ]"
                @click="pagamento = 'pix'"
              >
                <p class="font-medium">PIX</p>
                <p class="text-sm text-slate-500">Pagamento imediato</p>
              </button>
            </div>

            <!-- CARTÃO -->
            <div v-if="pagamento === 'cartao'" class="space-y-4 mb-6">
              <input class="w-full border rounded-lg px-4 py-3" placeholder="Número do cartão">
              <div class="grid grid-cols-2 gap-4">
                <input class="border rounded-lg px-4 py-3" placeholder="MM/AA">
                <input class="border rounded-lg px-4 py-3" placeholder="CVC">
              </div>

              <div class="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                🔒 Os dados do cartão não são armazenados.
                A cobrança será <strong>recorrente mensal</strong>.
              </div>
            </div>

            <!-- PIX -->
            <div v-if="pagamento === 'pix'" class="space-y-4 mb-6">
              <div class="flex justify-center">
                <div class="w-40 h-40 bg-slate-100 rounded-lg flex items-center justify-center">
                  QR CODE
                </div>
              </div>

              <p class="text-sm text-slate-600 text-center">
                A renovação será feita <strong>dentro do sistema a cada 30 dias</strong>.
              </p>
            </div>
          </template>

          <!-- CTA -->
          <button
            class="w-full bg-blue-600 hover:bg-blue-700
                   text-white font-semibold py-4 rounded-xl
                   transition-all shadow-md hover:shadow-lg"
            @click="submit"
          >
            {{ isTeste ? 'Ativar teste grátis' : 'Continuar para pagamento' }}
          </button>

          <!-- INFO -->
          <div class="mt-6 flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-blue-700">
            <span>💬</span>
            <p class="text-sm leading-relaxed">
              Após a confirmação, você receberá o
              <strong>acesso automaticamente pelo WhatsApp</strong>.
            </p>
          </div>
        </template>
      </div>

      <!-- RESUMO -->
      <aside v-if="plano" class="bg-white rounded-2xl shadow-lg p-8 h-fit border border-slate-100">
        <h2 class="text-sm uppercase tracking-wide text-slate-500 mb-2">
          Você está contratando
        </h2>

        <p class="text-xl font-bold mb-1">{{ plano.titulo }}</p>
        <p class="text-blue-600 font-semibold mb-4">
          {{ isTeste ? 'Teste gratuito' : 'Assinatura mensal' }}
        </p>

        <div
          v-if="plano.temPromocao"
          class="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700"
        >
          Oferta especial
        </div>

        <ul class="text-sm text-slate-600 space-y-2 mb-6">
          <li>✔ {{ plano.maxFiliais }} filial(is)</li>
          <li>✔ {{ plano.maxUsuarios }} usuário(s)</li>
          <li>✔ Acesso web e mobile</li>
          <li>✔ Suporte via WhatsApp</li>
        </ul>

        <div class="border-t pt-4 flex justify-between items-end gap-4">
          <span class="text-lg font-semibold">Total</span>
          <div class="text-right">
            <p v-if="plano.temPromocao" class="text-sm text-slate-400 line-through">
              R$ {{ money(plano.preco) }}
            </p>
            <p :class="['text-2xl font-bold', plano.temPromocao ? 'text-emerald-600' : 'text-blue-600']">
              R$ {{ money(plano.precoFinal) }}
            </p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { registrarProprietario } from '~/services/proprietario.service'
import { usePlanosStore } from '~/stores/planos.store'
import { maskCPF, isValidCPF } from '~/utils/cpf'
import { maskWhatsApp, isValidWhatsApp } from '~/utils/whatsapp'

const route = useRoute()
const planosStore = usePlanosStore()
const { completeRegistration, purchase } = useAnalytics()

useHead({
  title: 'Finalizar assinatura'
})

await planosStore.carregar(true)

const { planos, planoFree, carregando, erro } = storeToRefs(planosStore)

const plano = computed(() => {
  const id = route.query.plano as string | undefined
  return planos.value.find(p => p.id === id) ?? planoFree.value
})

const isTeste = computed(() => plano.value?.tipo === 'GRATUITO')
const money = (value: number) => new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(value)

const nome = ref('')
const cpf = ref('')
const whatsapp = ref('')
const pagamento = ref<'cartao' | 'pix' | null>(null)

const errors = ref({
  nome: '',
  cpf: '',
  whatsapp: ''
})

function onCpfInput(e: Event) {
  cpf.value = maskCPF((e.target as HTMLInputElement).value)
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

  if (!isTeste.value && !pagamento.value) {
    alert('Selecione a forma de pagamento')
    return false
  }

  return true
}

async function submit() {
  if (!validate() || !plano.value) return

  try {
    await registrarProprietario({
      cpf: cpf.value.replace(/\D/g, ''),
      nomeCompleto: nome.value.trim(),
      whatsapp: normalizeWhatsApp(whatsapp.value),
      idPlano: plano.value.id
    })

    completeRegistration({ plan: plano.value.tipo })
    if (!isTeste.value) {
      purchase({
        currency: 'BRL',
        value: plano.value.precoFinal,
        plan: plano.value.tipo
      })
    }

    await navigateTo('/sucesso')
  } catch (error) {
    console.error('Erro ao registrar proprietário', error)
    alert('Não foi possível concluir o cadastro. Tente novamente.')
  }
}
</script>
