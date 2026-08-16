# Analytics da Augile

A aplicação envia os eventos centralizados pelo composable `useAnalytics()` para o Google Analytics 4 e o Meta Pixel. Os plugins são exclusivamente client-side.

## Configuração

Cadastre o Pixel no **Gerenciador de Eventos da Meta**, em **Conectar fonte de dados > Web > Meta Pixel**, e copie o ID numérico. No ambiente de publicação, configure:

```dotenv
NUXT_PUBLIC_META_PIXEL_ID=123456789012345
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Para trocar qualquer ID, altere a variável correspondente e publique uma nova versão da aplicação. Não coloque tokens da Meta Conversions API no runtime público; a futura CAPI deve ser implementada no backend e compartilhar nomes e identificadores de eventos para permitir deduplicação.

Na Vercel, adicione `NUXT_PUBLIC_GA_ID` em **Settings > Environment Variables** para os ambientes **Production** e **Preview** e faça um novo deploy. O valor é um identificador público de medição, não uma chave privada.

## Eventos

As mudanças de rota enviam `PageView` ao Meta e `page_view` ao GA4. Os eventos de conversão são enviados somente depois da ação correspondente:

| Ação | Meta Pixel | GA4 |
| --- | --- | --- |
| Visualizar página | `PageView` | `page_view` |
| Visualizar conteúdo | `ViewContent` | `view_item` |
| Abrir cadastro/teste grátis | `Lead` | `generate_lead` |
| Clicar no WhatsApp | `Contact` | `contact` |
| Cadastro concluído | `CompleteRegistration` | `sign_up` |
| Plano pago contratado | `Purchase` | `purchase` |

Para adicionar um evento reutilizável, use um método existente ou `customEvent`:

```ts
const { viewContent, customEvent } = useAnalytics()

viewContent({ content_name: 'Plano Básico' })
customEvent('pricing_comparison_open', { source: 'pricing' })
```

Use apenas dados não sensíveis. CPF, telefone, nome, e-mail e outros dados pessoais não devem ser enviados ao navegador de Analytics. Para compras, informe ao menos `value` e `currency`; use um identificador real da transação em `transaction_id` quando ele estiver disponível.

## Validação do Meta Pixel

1. Instale a extensão **Meta Pixel Helper** no Chrome.
2. Abra o site publicado e confirme que o Pixel foi detectado e recebeu `PageView`.
3. Navegue entre as rotas e confirme um novo `PageView` por rota.
4. Clique em um link de WhatsApp e confirme `Contact`.
5. Acione o cadastro/teste e confirme `Lead`.
6. No Gerenciador de Eventos, use **Testar eventos** para acompanhar os eventos em tempo real.

## Validação do Google Analytics

No GA4, abra **Administrador > DebugView** durante o teste local com o modo de depuração habilitado no navegador, ou use **Relatórios > Tempo real** no ambiente publicado. Navegue pelas páginas e execute os CTAs; confirme os nomes GA4 da tabela acima. A extensão Google Analytics Debugger e a aba Network do navegador, filtrando por `collect`, ajudam a diagnosticar o envio.

Na aba Network, filtre primeiro por `googletagmanager` para confirmar o carregamento de `gtag/js?id=...` e depois por `collect` para confirmar cada `page_view`. Bloqueadores de anúncios podem impedir essas requisições; nesse caso, teste com eles desativados para o domínio.
