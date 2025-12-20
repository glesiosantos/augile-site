<template>
  <footer class="bg-slate-900 text-slate-300 py-12">
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
      <div>
        <!-- <h3 class="text-white font-bold mb-4">Augile</h3>
        <p class="text-sm">
          Sistema de gestão para oficinas mecânicas.
        </p> -->
        <img
          src="/assets/imgs/augile_logo_branco_completo.png"
          alt="Augile"
          class="mx-auto mb-8 h-16 md:h-20"
        >
      </div>

      <div>
        <h4 class="text-white font-semibold mb-3">Produto</h4>
        <ul class="space-y-2 text-sm">
          <li>Funcionalidades</li>
          <li>Planos</li>
          <li>Teste grátis</li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-3">Suporte</h4>
        <ul class="space-y-2 text-sm">
          <li>Central de ajuda</li>
          <li>WhatsApp</li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-3">Legal</h4>
        <ul class="space-y-2 text-sm">
          <li>Política de Privacidade</li>
          <li>Termos de Uso</li>
        </ul>
      </div>
    </div>

    <p class="text-center text-xs mt-10">
      © {{ new Date().getFullYear() }} Augile. Todos os direitos reservados.
    </p>
  </footer>
</template>
