<template>
  <section class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Headline -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">
          Comece organizado. Evolua no seu ritmo.
        </h2>
        <p class="text-lg text-slate-600">
          Use o plano gratuito para organizar sua oficina
          e ative recursos avançados quando precisar.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard
          icon="🧾"
          title="Ordens de Serviço"
          text="Crie e gerencie até 20 ordens de serviço por mês."
          badge="Gratuito"
        />

        <FeatureCard
          icon="👤"
          title="Clientes e Veículos"
          text="Mantenha o histórico completo de clientes e veículos atendidos."
          badge="Gratuito"
        />

        <FeatureCard
          icon="📅"
          title="Agenda Simples"
          text="Organize os atendimentos do dia com mais clareza."
          badge="Gratuito"
        />

        <FeatureCard
          icon="🛠️"
          title="Serviços Cadastrados"
          text="Cadastre até 10 serviços para agilizar o atendimento."
          badge="Gratuito"
        />
      </div>
    </div>
  </section>
</template>
