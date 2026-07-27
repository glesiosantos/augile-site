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
useSeoMeta({
  title: 'Augile | Gestão simples para oficinas automotivas',
  description: 'Organize ordens de serviço, clientes, veículos, agenda e serviços da sua oficina em um só lugar. Comece gratuitamente.',
  ogTitle: 'Augile | Gestão simples para oficinas automotivas',
  ogDescription: 'Organize ordens de serviço, clientes, veículos, agenda e serviços da sua oficina em um só lugar. Comece gratuitamente.',
  ogType: 'website'
})
useHead({
  titleTemplate: null,
  htmlAttrs: { lang: 'pt-BR' }
})
</script>
