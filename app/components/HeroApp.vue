<template>
  <section class="relative min-h-screen flex items-center justify-center text-center">
    <!-- Imagem de fundo -->
    <img
      src="/assets/imgs/oficina-mecanica.webp"
      class="absolute inset-0 w-full h-full object-cover"
      alt="Oficina mecânica"
    >

    <!-- Overlay -->
    <div class="absolute inset-0 bg-slate-900/70" />

    <!-- Conteúdo -->
    <div class="relative max-w-3xl mx-auto px-6 text-white">
      <!-- LOGO CENTRAL -->
      <img
        src="/assets/imgs/augile_logo_branco_completo.png"
        alt="Augile"
        class="mx-auto mb-8 h-16 md:h-20"
      >

      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Controle total da sua oficina
        <br>
        <span class="text-blue-400">
          em um único sistema
        </span>
      </h1>

      <p class="text-slate-200 mb-10 text-lg">
        Organize serviços, equipe e financeiro com o Augile.
        Simples, rápido e feito para oficinas mecânicas.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/checkout?plano=free14"
          class="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-center"
        >
          Teste grátis por 14 dias
        </NuxtLink>

        <a
          href="#planos"
          class="px-8 py-4 border border-white/80 rounded-lg text-center hover:bg-white hover:text-slate-900 transition"
        >
          Ver planos
        </a>
      </div>
    </div>
  </section>
</template>
