<template>
  <section class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Headline -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">
          Tudo o que sua oficina precisa para crescer
        </h2>
        <p class="text-lg text-slate-600">
          Menos bagunça, mais controle e decisões mais inteligentes
          para aumentar seu faturamento.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon="🛠️"
          title="Ordens de Serviço Inteligentes"
          text="Acompanhe cada serviço em tempo real, do orçamento à entrega do veículo."
          highlight
        />

        <FeatureCard
          icon="💰"
          title="Financeiro sem Surpresas"
          text="Controle entradas, saídas e lucros com clareza e relatórios automáticos."
        />

        <FeatureCard
          icon="👥"
          title="Equipe Organizada"
          text="Defina permissões e acompanhe a produtividade da sua equipe."
        />

        <FeatureCard
          icon="📅"
          title="Agendamentos Otimizados"
          text="Evite filas, atrasos e confusão com uma agenda simples e visual."
        />

        <FeatureCard
          icon="📊"
          title="Relatórios que Ajudam a Decidir"
          text="Veja o que dá lucro, o que precisa melhorar e onde investir."
        />

        <FeatureCard
          icon="🔒"
          title="Segurança Profissional"
          text="Seus dados protegidos com tecnologia segura e backups automáticos."
        />
      </div>
    </div>
  </section>
</template>
