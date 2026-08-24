# Formulário de aplicação — Seheilen

Pacote estático preparado para publicação no GitHub Pages em:

`https://aplicacao.seheilen.com`

## Arquivos

- `index.html`: conteúdo e campos do formulário;
- `styles.css`: identidade visual e responsividade;
- `script.js`: etapas, validação e envio;
- `CNAME`: associação ao subdomínio;
- `.nojekyll`: publicação direta sem processamento do Jekyll.

## Como publicar

1. Envie todos os arquivos deste pacote para a raiz do repositório `seheilen-aplicacao`.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch **main** e a pasta **/(root)**.
5. Salve e aguarde a primeira publicação.
6. Em **Custom domain**, confirme `aplicacao.seheilen.com`.
7. No DNS, crie o `CNAME` de `aplicacao` apontando para `SEU-USUARIO.github.io`.
8. Após a validação, ative **Enforce HTTPS**.

## Atenção: recebimento das respostas

O pacote está pronto para ser hospedado, mas o envio permanece bloqueado até que um banco de dados seja conectado. Isso evita exibir uma confirmação falsa sem salvar a aplicação.

Depois de criar o serviço que receberá as respostas, abra `index.html` e informe a URL no atributo `data-endpoint` do formulário:

```html
<form id="application-form" data-endpoint="https://ENDERECO-DO-SEU-SERVICO" novalidate>
```

Não coloque senhas, chaves privadas ou credenciais nos arquivos do GitHub Pages.
