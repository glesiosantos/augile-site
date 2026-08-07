<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="signupOpen" class="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/65 p-0 sm:items-center sm:p-5" @mousedown.self="close">
        <section
          ref="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-title"
          class="max-h-[95dvh] w-full max-w-xl overflow-y-auto rounded-t-[20px] bg-white p-5 shadow-2xl sm:rounded-[20px] sm:p-8"
          @keydown="onKeydown"
        >
          <div class="flex items-start justify-between gap-6">
            <div><p class="text-sm font-bold uppercase tracking-wider text-blue-700">{{ signupPlanTitle }}</p><h2 id="signup-title" class="mt-2 text-2xl font-extrabold text-slate-950">Crie seu acesso à Augile</h2></div><button
              ref="closeButton"
              class="flex size-11 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Fechar cadastro"
              @click="close"
            >
              <LandingIcon name="close" class="size-6" />
            </button>
          </div>
          <p class="mt-4 leading-7 text-slate-600">{{ planDescription }}</p>
          <form
            class="mt-7 space-y-5"
            novalidate
            @submit.prevent="submit"
            @input="markStarted"
          >
            <div>
              <label for="signup-name" class="mb-2 block text-sm font-bold text-slate-800">Nome completo</label><input
                id="signup-name"
                v-model="nome"
                autocomplete="name"
                class="landing-input"
                :aria-invalid="Boolean(errors.nome)"
                :aria-describedby="errors.nome ? 'signup-name-error' : undefined"
              ><p v-if="errors.nome" id="signup-name-error" class="mt-2 text-sm font-medium text-red-700">{{ errors.nome }}</p>
            </div>
            <div>
              <label for="signup-cpf" class="mb-2 block text-sm font-bold text-slate-800">CPF</label><input
                id="signup-cpf"
                inputmode="numeric"
                autocomplete="off"
                maxlength="14"
                class="landing-input"
                :value="cpf"
                :aria-invalid="Boolean(errors.cpf)"
                aria-describedby="signup-cpf-help signup-cpf-error"
                @keydown="onlyNumbers"
                @paste.prevent="onPasteCpf"
                @input="onCpfInput"
              ><p id="signup-cpf-help" class="mt-2 text-xs leading-5 text-slate-500">O CPF é usado para identificar seu cadastro e seu acesso ao sistema.</p><p v-if="errors.cpf" id="signup-cpf-error" class="mt-1 text-sm font-medium text-red-700">{{ errors.cpf }}</p>
            </div>
            <div>
              <label for="signup-whatsapp" class="mb-2 block text-sm font-bold text-slate-800">WhatsApp</label><input
                id="signup-whatsapp"
                inputmode="tel"
                autocomplete="tel"
                maxlength="15"
                class="landing-input"
                placeholder="(99) 99999-9999"
                :value="whatsapp"
                :aria-invalid="Boolean(errors.whatsapp)"
                aria-describedby="signup-whatsapp-help signup-whatsapp-error"
                @keydown="onlyNumbers"
                @paste.prevent="onPasteWhatsApp"
                @input="onWhatsAppInput"
              ><p id="signup-whatsapp-help" class="mt-2 text-xs leading-5 text-slate-500">O link de acesso e o código para entrar serão enviados para este número.</p><p v-if="errors.whatsapp" id="signup-whatsapp-error" class="mt-1 text-sm font-medium text-red-700">{{ errors.whatsapp }}</p>
            </div>
            <div v-if="submitError" role="alert" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">{{ submitError }}</div>
            <button type="submit" :disabled="submitting" class="landing-button-primary w-full disabled:cursor-wait disabled:opacity-70"><span v-if="submitting">Enviando...</span><span v-else>{{ signupButtonLabel }}</span></button>
            <p class="text-center text-xs leading-5 text-slate-500">Ao continuar, você envia os dados acima para a criação do seu acesso. Os documentos legais ainda precisam ser publicados no site.</p>
          </form>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { isAxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { registrarProprietario } from '~/services/proprietario.service'
import { maskCPF, isValidCPF } from '~/utils/cpf'
import { maskWhatsApp, normalizeWhatsApp, isValidWhatsApp } from '~/utils/whatsapp'

const { signupOpen, selectedPlan, track } = useLanding()
const { completeRegistration } = useAnalytics()
const store = usePlanosStore(); const { planos } = storeToRefs(store)
const dialog = ref<HTMLElement | null>(null); const closeButton = ref<HTMLButtonElement | null>(null)
const nome = ref(''); const cpf = ref(''); const whatsapp = ref(''); const submitting = ref(false); const submitError = ref(''); const started = ref(false)
const errors = ref<{ nome?: string; cpf?: string; whatsapp?: string }>({})
let trigger: HTMLElement | null = null
const selectedPlanData = computed(() => planos.value.find(plan => plan.tipo === selectedPlan.value) ?? null)
const isFreePlan = computed(() => selectedPlan.value === 'GRATUITO')
const signupPlanTitle = computed(() => isFreePlan.value ? 'Plano Gratuito' : selectedPlanData.value?.titulo ?? 'Plano selecionado')
const signupButtonLabel = computed(() => isFreePlan.value ? 'Começar grátis' : `Escolher ${selectedPlanData.value?.titulo ?? 'plano'}`)
const planDescription = computed(() => isFreePlan.value
  ? 'Comece com o plano Gratuito, sem prazo para acabar e sem cadastrar cartão.'
  : selectedPlanData.value?.trialDays
    ? `Experimente o ${selectedPlanData.value.titulo} por ${selectedPlanData.value.trialDays} dias. Nenhum cartão é solicitado agora.`
    : `Cadastre-se para começar com o ${selectedPlanData.value?.titulo ?? 'plano selecionado'}.`)

watch(signupOpen, async(open) => { if (!import.meta.client) return; if (open) { trigger = document.activeElement as HTMLElement; document.body.style.overflow = 'hidden'; await nextTick(); closeButton.value?.focus() } else { document.body.style.overflow = ''; trigger?.focus() } })
onBeforeUnmount(() => { if (import.meta.client) document.body.style.overflow = '' })
function close() { if (!submitting.value) signupOpen.value = false }
function markStarted() { if (!started.value) { started.value = true; track('signup_start', { plan: selectedPlan.value }) } }
function onlyNumbers(event: KeyboardEvent) { if (!['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(event.key) && !/^\d$/.test(event.key)) event.preventDefault() }
function onCpfInput(event: Event) { cpf.value = maskCPF((event.target as HTMLInputElement).value); delete errors.value.cpf }
function onPasteCpf(event: ClipboardEvent) { cpf.value = maskCPF(event.clipboardData?.getData('text') ?? ''); delete errors.value.cpf }
function onWhatsAppInput(event: Event) { whatsapp.value = maskWhatsApp((event.target as HTMLInputElement).value); delete errors.value.whatsapp }
function onPasteWhatsApp(event: ClipboardEvent) { whatsapp.value = maskWhatsApp(event.clipboardData?.getData('text') ?? ''); delete errors.value.whatsapp }
function validate() { errors.value = {}; if (nome.value.trim().split(/\s+/).length < 2) errors.value.nome = 'Informe seu nome completo.'; if (!isValidCPF(cpf.value)) errors.value.cpf = 'Informe um CPF válido.'; if (!isValidWhatsApp(whatsapp.value)) errors.value.whatsapp = 'Informe um WhatsApp com DDD e 11 dígitos.'; if (Object.keys(errors.value).length) track('signup_validation_error', { plan: selectedPlan.value }); return Object.keys(errors.value).length === 0 }
function onKeydown(event: KeyboardEvent) { if (event.key === 'Escape') { close(); return } if (event.key !== 'Tab' || !dialog.value) return; const focusable = [...dialog.value.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]')]; if (!focusable.length) return; const first = focusable[0]!; const last = focusable[focusable.length - 1]!; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() } }
async function submit() { submitError.value = ''; if (!validate()) return; if (!selectedPlanData.value) { submitError.value = 'O plano selecionado está indisponível no momento.'; return } submitting.value = true; try { await registrarProprietario({ cpf: cpf.value.replace(/\D/g, ''), nomeCompleto: nome.value.trim(), whatsapp: normalizeWhatsApp(whatsapp.value), idPlano: selectedPlanData.value.id }); track('signup_success', { plan: selectedPlan.value }); completeRegistration({ plan: selectedPlan.value }); signupOpen.value = false; await navigateTo('/sucesso') } catch (error: unknown) { submitError.value = 'Não foi possível concluir o cadastro. Revise os dados e tente novamente.'; if (isAxiosError(error)) { const message = error.response?.data?.message; if (Array.isArray(message) && message[0]) submitError.value = message[0]; else if (typeof message === 'string') submitError.value = message } } finally { submitting.value = false } }
</script>
