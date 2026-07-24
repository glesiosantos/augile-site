<template>
  <section id="duvidas" class="landing-section scroll-mt-20 bg-white">
    <div class="landing-container">
      <div class="landing-heading"><p class="landing-eyebrow">Dúvidas frequentes</p><h2>Respostas para começar com segurança</h2></div><div class="mx-auto max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
        <div v-for="(item, index) in faqItems" :key="item.question">
          <h3>
            <button
              :id="`faq-button-${index}`"
              class="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-lg font-bold text-slate-900"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-panel-${index}`"
              @click="toggle(index)"
            >
              {{ item.question }}<LandingIcon name="chevron" :class="['size-5 shrink-0 text-blue-600 transition', openIndex === index && 'rotate-180']" />
            </button>
          </h3><div
            v-show="openIndex === index"
            :id="`faq-panel-${index}`"
            role="region"
            :aria-labelledby="`faq-button-${index}`"
            class="pb-5 pr-10 leading-7 text-slate-600"
          >
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">import { faqItems } from '~/data/landing'; const openIndex = ref<number | null>(null); const { track } = useLanding(); function toggle(index: number) { openIndex.value = openIndex.value === index ? null : index; if (openIndex.value === index) track('faq_expand', { faq: String(index) }) }</script>
