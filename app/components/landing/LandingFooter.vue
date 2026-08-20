<template>
  <footer class="bg-premium py-12 text-copy-muted">
    <div class="landing-container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><img src="~/assets/imgs/logo_augile_horizontal_branco.png" alt="Augile — Gestão inteligente para oficinas" class="h-14 w-auto object-contain"><p class="mt-4 max-w-sm text-sm leading-6 text-slate-400">Gestão simples para organizar ordens de serviço, clientes, veículos, agenda e serviços da oficina.</p></div><div>
        <h2 class="text-sm font-bold uppercase tracking-wider text-white">Produto e suporte</h2><ul class="mt-4 space-y-3 text-sm">
          <li><a href="#recursos" class="hover:text-white">Recursos</a></li><li><a href="#planos" class="hover:text-white">Planos</a></li><li>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white"
              @click="track('whatsapp_click', { location: 'footer' })"
            >Atendimento pelo WhatsApp</a>
          </li><li><a :href="appUrl" class="hover:text-white">Entrar</a></li>
        </ul>
      </div><div><h2 class="text-sm font-bold uppercase tracking-wider text-white">Documentos</h2><p class="mt-4 text-sm leading-6 text-slate-500">Política de Privacidade e Termos de Uso ainda não estão publicados neste projeto.</p></div>
    </div><div class="landing-container mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">© {{ year }} Augile. Todos os direitos reservados.</div>
  </footer>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { track } = useLanding()
const year = new Date().getFullYear()
const appUrl = computed(() => String(config.public.urlAppGestor || 'https://app.augile.com.br'))
const whatsappUrl = computed(() => `https://wa.me/${config.public.whatsAppNumber}?text=${encodeURIComponent('Olá! Quero conhecer a Augile para minha oficina.')}`)
</script>
