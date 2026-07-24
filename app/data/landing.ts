export const landingNavigation = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '#planos' },
  { label: 'Dúvidas', href: '#duvidas' }
]

export const showcaseItems = [
  {
    id: 'clientes', label: 'Cadastro de clientes', icon: 'users',
    title: 'Cadastre os clientes em poucos passos',
    description: 'Reúna os dados do cliente e seus contatos em um único cadastro.',
    points: ['CPF ou CNPJ no cadastro', 'Mais de um contato por cliente', 'Identificação do número com WhatsApp']
  },
  {
    id: 'veiculos', label: 'Cadastro de veículos', icon: 'clipboard',
    title: 'Vincule cada veículo ao seu cliente',
    description: 'Registre as informações do veículo dentro do cadastro do proprietário.',
    points: ['Marca e modelo do veículo', 'Ano, placa e cor', 'Chassi como informação opcional']
  },
  {
    id: 'ordens', label: 'Ordens de serviço', icon: 'clipboard',
    title: 'Monte a ordem de serviço em uma única tela',
    description: 'Reúna cliente, veículo, serviços, produtos e condições de pagamento antes de finalizar a ordem.',
    points: ['Serviços e produtos na mesma ordem', 'Condições de pagamento visíveis', 'Total calculado antes da finalização']
  },
  {
    id: 'estoque', label: 'Produtos e estoque', icon: 'wrench',
    title: 'Cadastre produtos e controle seus dados de venda',
    description: 'Organize as informações comerciais do produto e indique se ele possui estoque.',
    points: ['Custo, margem e preço de venda', 'Fornecedor e unidade de venda', 'Controle de produto ativo e estoque']
  },
  {
    id: 'fornecedores', label: 'Fornecedores', icon: 'users',
    title: 'Mantenha os fornecedores organizados',
    description: 'Consulte os fornecedores da oficina e cadastre novos contatos sem sair da listagem.',
    points: ['Busca rápida por fornecedor', 'Contato centralizado', 'Acesso ao cadastro de produtos']
  }
] as const

export const faqItems = [
  {
    question: 'O plano gratuito tem prazo para acabar?',
    answer:
      'Não. O plano gratuito não possui prazo de encerramento, desde que sejam respeitados os limites apresentados na seção de planos.',
  },
  {
    question: 'Preciso cadastrar um cartão para começar?',
    answer:
      'Não. Você pode criar sua conta e iniciar o período de teste sem cadastrar um cartão.',
  },
  {
    question: 'O que acontece depois dos 14 dias de teste?',
    answer:
      'Após os 14 dias, sua conta será transferida automaticamente para o plano gratuito. Os limites de serviços, usuários e ordens de serviço serão ajustados conforme as condições desse plano.',
  },
  {
    question: 'Posso mudar de plano depois?',
    answer:
      'Sim. Você pode mudar de plano quando desejar, sem perder os dados cadastrados.',
  },
  {
    question: 'Meus dados ficam salvos se eu mudar de plano?',
    answer:
      'Sim. Seus dados permanecem salvos. Apenas os recursos e limites disponíveis serão ampliados ou reduzidos de acordo com o plano escolhido.',
  },
  {
    question: 'Como recebo o acesso?',
    answer:
      'Após concluir o cadastro, você receberá um link para acessar a plataforma e configurar sua conta.',
  },
  {
    question: 'A Augile funciona no celular?',
    answer:
      'Sim. A Augile utiliza a tecnologia PWA, que permite acessar a plataforma pelo navegador e adicionar um atalho à tela inicial do celular, proporcionando uma experiência semelhante à de um aplicativo.',
  },
] as const
