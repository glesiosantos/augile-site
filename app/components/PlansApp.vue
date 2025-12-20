<template>
  <section id="planos" class="py-20 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">
        Escolha o plano ideal
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <PlanCard
          id="basico"
          title="Básico"
          subtitle="Ideal para oficinas pequenas"
          price="49,90"
          :features="[
            '1 proprietário',
            '1 colaborador',
            'Ordens de serviço',
            'Controle financeiro básico',
            'Suporte via WhatsApp'
          ]"
        />

        <PlanCard
          id="profissional"
          title="Profissional"
          subtitle="Para oficinas em crescimento"
          price="69,90"
          highlight
          :features="[
            '1 proprietário',
            'Até 5 colaboradores',
            'Ordens de serviço ilimitadas',
            'Relatórios gerenciais',
            'Controle financeiro completo',
            'Suporte prioritário'
          ]"
        />

        <PlanCard
          id="business"
          title="Business"
          subtitle="Para oficinas estruturadas"
          price="99,90"
          :features="[
            '2 proprietários',
            'Até 10 colaboradores',
            'Relatórios avançados',
            'Múltiplas oficinas',
            'Suporte dedicado'
          ]"
        />
      </div>
    </div>
  </section>
</template>
