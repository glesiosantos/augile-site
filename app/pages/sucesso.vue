<template>
  <section
    class="relative min-h-screen flex items-end
           overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700"
  >
    <!-- OVERLAY PARA CONTRASTE -->
    <div class="absolute inset-0 bg-slate-950/35" />

    <!-- CONTEÚDO -->
    <div
      class="relative z-10 w-full flex justify-center
             pb-[50px] px-6"
    >
      <!-- CARD TRANSLÚCIDO -->
      <div
        class="w-full max-w-xl
               bg-white/10 backdrop-blur-xl
               rounded-3xl p-8 md:p-10
               text-center text-white
               shadow-2xl border border-white/20"
      >
        <!-- LOGO -->
        <img
          src="~/assets/imgs/logo_augile_horizontal_branco.png"
          alt="Augile"
          class="mx-auto mb-6 h-14 md:h-16"
        >

        <!-- TEXTO -->
        <h1 class="text-2xl md:text-3xl font-bold mb-4">
          Cadastro realizado com sucesso 🎉
        </h1>

        <p class="text-slate-200 mb-8 leading-relaxed">
          Obrigado pela confiança no <strong>Augile</strong>.
          Em instantes você receberá no WhatsApp
          o link de acesso e seu código para entrar no sistema.
        </p>

        <!-- BOTÕES -->
        <div class="flex flex-col sm:flex-row gap-4">
          <a
            href="https://app.augile.com.br"
            class="w-full py-4 rounded-xl
                   bg-blue-600 hover:bg-blue-700
                   transition font-semibold shadow-lg"
          >
            Acessar sistema
          </a>

          <NuxtLink
            to="/"
            class="w-full py-4 rounded-xl
                   border border-white/30
                   hover:bg-white/20 transition
                   font-semibold"
          >
            Voltar ao site
          </NuxtLink>
        </div>

        <!-- INFO -->
        <p class="text-xs text-slate-300 mt-6">
          💬 Nosso suporte está disponível via WhatsApp sempre que precisar
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
useHead({
  title: 'Sucesso!'
})
</script>
