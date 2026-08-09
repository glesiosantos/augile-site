<template>
  <div class="overflow-x-clip">
    <LandingHeader />
    <main>
      <LandingHeroSection />
      <LandingTrustBar />
      <LandingProblemSolutionSection />
      <LandingProductShowcase />
      <LandingHowItWorks />
      <LandingBenefitsGrid />
      <LandingPricingSection />
      <LandingSocialProof />
      <LandingFaqSection />
      <LandingFinalCta />
    </main>
    <WhatsappFloat />
    <LandingFooter />
    <LandingSignupModal />
  </div>
</template>
<script setup lang="ts">
import socialImage from '~/assets/imgs/ordem_servico.png'

const config = useRuntimeConfig()
const requestUrl = useRequestURL()
const siteUrl = computed(() => String(config.public.siteUrl || requestUrl.origin).replace(/\/$/, ''))
const canonicalUrl = computed(() => `${siteUrl.value}/`)
const socialImageUrl = computed(() => new URL(socialImage, canonicalUrl.value).toString())

useSeoMeta({
  title: 'Augile | Gestão para oficinas de carros, motos e caminhões',
  description: 'Organize ordens de serviço, clientes, veículos, agenda e estoque da sua oficina. Teste a Augile grátis por 14 dias.',
  ogTitle: 'Augile | Gestão simples para sua oficina',
  ogDescription: 'Gestão para oficinas de carros, motos e caminhões, com ordens de serviço, clientes, veículos, agenda e estoque.',
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: socialImageUrl,
  ogImageAlt: 'Tela de ordem de serviço da plataforma Augile',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Augile | Gestão simples para sua oficina',
  twitterDescription: 'Organize sua oficina e teste a Augile grátis por 14 dias.',
  twitterImage: socialImageUrl
})
useHead({
  titleTemplate: null,
  htmlAttrs: { lang: 'pt-BR' },
  link: [{ rel: 'canonical', href: canonicalUrl }]
})
</script>
