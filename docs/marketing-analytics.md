# Marketing e analytics da Augile

Este documento descreve o rastreamento da landing page usada nas campanhas da Augile. Eventos de marketing devem passar por `useAnalytics()`; componentes não devem acessar `window.fbq` ou `window.gtag` diretamente.

## Configuração existente

O GA4 é carregado pelo plugin `app/plugins/analytics.client.ts`. O plugin configura `send_page_view: false`, pois o `PageView` é controlado pela aplicação para evitar duplicidade durante a navegação Nuxt.

O Meta Pixel é carregado por `app/plugins/meta-pixel.client.ts`. O ID vem exclusivamente de `runtimeConfig.public.metaPixelId`, preenchido pela variável:

```dotenv
NUXT_PUBLIC_META_PIXEL_ID=
```

Somente IDs numéricos são aceitos. Não coloque tokens da Meta Conversions API, dados pessoais ou segredos em variáveis `NUXT_PUBLIC_*`.

Variáveis públicas relacionadas:

```dotenv
NUXT_PUBLIC_GA_ID=
NUXT_PUBLIC_GTM_ID=
NUXT_PUBLIC_META_PIXEL_ID=
NUXT_PUBLIC_SITE_URL=
NUXT_PUBLIC_WHATSAPP_NUMBER=
NUXT_PUBLIC_APP_URL=
NUXT_PUBLIC_API_BASE_URL=
```

`NUXT_PUBLIC_GTM_ID` é opcional. Não configure no GTM tags que dupliquem os eventos enviados diretamente pela aplicação.

## Eventos do funil

| Evento | GA4 | Meta | Onde dispara |
| --- | --- | --- | --- |
| Visualização de página | `page_view` | `PageView` | Primeiro carregamento e depois de uma mudança real de `fullPath`, em `meta-pixel.client.ts` |
| Visualização de planos | `view_item` | `ViewContent` | Uma vez, quando pelo menos 35% da seção `#planos` fica visível |
| Interesse em cadastro | `generate_lead` | `Lead` | Ao abrir o cadastro por um CTA de teste ou de plano |
| Intenção de teste | `begin_trial` | `StartTrial` | Junto da abertura do cadastro, antes de qualquer registro concluído |
| Plano selecionado | `plan_selected` | `plan_selected` | CTA de um plano na seção de preços |
| Contato comercial | `contact` | `Contact` | Links comerciais de WhatsApp, com `channel: whatsapp` e `location` |
| Cadastro concluído | `sign_up` | `CompleteRegistration` | Somente após sucesso da API `POST /auth/registrar` |
| Compra confirmada | `purchase` | `Purchase` | Não é disparado atualmente; deve ser integrado somente a uma confirmação real do backend |

Outros eventos de UX, como `signup_open`, `signup_start`, `signup_validation_error`, `signup_success`, `comparison_open` e `faq_expand`, são enviados como eventos customizados.

Os valores de `plan` usados em marketing são `basico` e `profissional`. CPF, nome e WhatsApp nunca são enviados ao analytics.

## UTMs e atribuição

No primeiro carregamento da sessão, `useMarketingAttribution()` captura:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

A origem inicial é armazenada em `sessionStorage` sob `augile_marketing_attribution`. Ela não é sobrescrita por navegações posteriores e é anexada aos eventos durante a mesma sessão. `source` e `campaign` também são derivados de `utm_source` e `utm_campaign` para o cadastro e demais conversões.

Nenhum dado pessoal é armazenado nesse mecanismo. Valores recebidos são limitados a 200 caracteres.

## Como adicionar eventos

Prefira os métodos de `useAnalytics()`:

```ts
const {
  trackLead,
  trackContact,
  trackTrialStart,
  trackCompleteRegistration,
  trackPurchase,
  trackCustomEvent
} = useAnalytics()
```

Use `trackCustomEvent('nome_consistente', dados)` apenas quando não houver um método padronizado. `trackPurchase()` exige `value` e `currency`; ele não pode ser associado a clique, abertura de checkout ou simples criação de conta.

## Como testar

1. Use um ambiente com IDs de teste ou o modo **Testar eventos** do Gerenciador de Eventos da Meta.
2. Abra `/?utm_source=meta&utm_medium=paid_social&utm_campaign=teste`.
3. No Meta Pixel Helper, confirme um único `PageView` no carregamento.
4. Navegue para outra rota e confirme um novo `PageView`; não deve haver duplicidade na mesma `fullPath`.
5. Role até Planos e confirme `ViewContent` / `view_item` apenas uma vez.
6. Clique em Básico e Profissional e confirme `Lead`, `StartTrial` e `plan_selected` com o plano correto.
7. Abra e comece a preencher o formulário; confirme que `CompleteRegistration` ainda não ocorreu.
8. Conclua um cadastro de teste válido e confirme `CompleteRegistration` somente após a resposta bem-sucedida da API.
9. Clique em cada link de WhatsApp e confirme `Contact`, `channel: whatsapp` e a localização.
10. Confira no GA4 DebugView os equivalentes da tabela e verifique os parâmetros UTM.

Também valide a aba Network e o console do navegador. Não use dados pessoais reais em testes de analytics.

## Performance e apresentação

- A imagem da primeira dobra possui dimensões fixas, prioridade alta e decodificação assíncrona para ajudar LCP e reduzir CLS.
- As capturas abaixo da dobra usam `loading="lazy"` e dimensões declaradas.
- Scripts de GA4, GTM e Meta são carregados de forma assíncrona e somente quando configurados.
- A landing mantém o layout responsivo existente, botões com área mínima de toque e contenção de overflow horizontal.
- O SEO da home inclui title, description, canonical, Open Graph e Twitter Card. Configure `NUXT_PUBLIC_SITE_URL` com a origem pública canônica.

## Checklist de deploy

- [ ] Configurar `NUXT_PUBLIC_META_PIXEL_ID` com o ID numérico real do Dataset/Pixel.
- [ ] Confirmar `NUXT_PUBLIC_GA_ID` e evitar tags duplicadas no GTM.
- [ ] Configurar `NUXT_PUBLIC_SITE_URL` com a URL pública, sem caminho adicional.
- [ ] Confirmar `NUXT_PUBLIC_WHATSAPP_NUMBER` apenas com o número comercial correto, incluindo país e DDD.
- [ ] Confirmar `NUXT_PUBLIC_API_BASE_URL` e `NUXT_PUBLIC_APP_URL`.
- [ ] Executar lint, typecheck e build.
- [ ] Validar larguras de 360px, 390px e 430px em navegador real ou DevTools.
- [ ] Testar os dois caminhos: anúncio → cadastro concluído e anúncio → WhatsApp.
- [ ] Validar o compartilhamento da URL no Facebook Sharing Debugger e no LinkedIn Post Inspector.
- [ ] Confirmar eventos no Meta Test Events e GA4 DebugView antes de ativar a campanha.

## Pendência de compra

O frontend não possui hoje uma resposta autenticada de confirmação de pagamento. Por isso, `Purchase` não é disparado. Quando o backend disponibilizar uma confirmação confiável, envie `currency: 'BRL'`, o `value` efetivamente confirmado e, se disponível, um `transaction_id` estável para deduplicação.
