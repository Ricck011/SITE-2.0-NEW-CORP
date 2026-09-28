# Site da NEW CORP STUDIO

Página única, feita em HTML, CSS e JavaScript puros, sem build e sem npm. Tudo o que vai para o ar está na pasta `site/`.

## Ver o site no seu computador

O JavaScript do site é do tipo "módulo" e não roda quando você dá dois cliques no `index.html`. Por isso, abra sempre por um servidor local.

1. Abra o PowerShell na pasta do projeto:
   ```powershell
   cd "F:\NEW CORP - HOME\landing-revio"
   ```
2. Ligue o servidor, que serve só a pasta `site/`:
   ```powershell
   python -m http.server 8083 -d site
   ```
   Confira: aparece `Serving HTTP on :: port 8083`.
3. No Chrome, abra `http://localhost:8083`.
4. No celular, no mesmo Wi-Fi de casa, abra `http://<IP do computador>:8083`. O IP aparece no comando `ipconfig`, na linha "Endereço IPv4". Se o Windows perguntar sobre o firewall do Python, clique em Permitir.
5. Para desligar o servidor, aperte `Ctrl+C` no PowerShell.

## Rodar os testes

```powershell
node --test "testes/*.test.js"
```

Confira: a última parte mostra `pass 17` e `fail 0`. Os testes conferem as regras do diagnóstico e da mensagem do WhatsApp, a matemática do topo e a página inteira: nenhum travessão, nenhuma palavra de estoque, nenhum preço, âncoras certas, os portões do topo iguais no CSS e no JS, o tamanho do vídeo e o peso do JavaScript.

## Onde mora cada coisa

| Caminho | O que é |
|---|---|
| `site/index.html` | A página inteira, com todo o texto |
| `site/assets/css/site.css` | Cores, fontes, layout e movimento |
| `site/assets/js/main.js` | Diagnóstico, formulário, menu, o fio e as entradas |
| `site/assets/js/hero.js` | O topo guiado pela rolagem e o vídeo |
| `site/assets/js/lib.js` | Regras puras, cobertas pelos testes |
| `site/assets/video/hero-scrub.mp4` | O vídeo do topo, preparado para rolagem |
| `site/.htaccess` | Redireciona `/sobre` e `/servicos`, e cuida da compressão e do cache na HostGator |
| `PRODUCT.md` | O que o site precisa fazer e o que nunca pode dizer |
| `docs/pacote-de-design.md` | As decisões de design aprovadas e todo o texto |
| `docs/auditoria.md` | Regras fechadas e o que não pode voltar do site antigo |
| `docs/prompt-mestre.md` | O prompt para uma sessão nova do Claude Code continuar o trabalho |

## Trocar o vídeo do topo

1. Gere e aprove o vídeo novo, que fica em `midia-bruta/`, uma pasta que não vai para o git.
2. Prepare para rolagem:
   ```powershell
   ffmpeg -i midia-bruta\topo\novo.mp4 -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an site\assets\video\hero-scrub.mp4
   ```
3. Atualize `VIDEO_BYTES` em `site/assets/js/hero.js` com o tamanho do arquivo novo, em bytes. O teste avisa se esquecer.
4. Refaça a checagem de contraste do pior quadro de cada faixa e o teste de flick (o passo a passo está em `docs/pacote-de-design.md`, seção 4).

## Publicar

A publicação ainda não foi feita. A hospedagem vai ser a HostGator, por FTP, e o domínio ainda não foi definido. Antes de publicar, troque `DOMINIO` pelo endereço final nas duas linhas marcadas com `DEPLOY STEP` no `site/index.html`. Até lá, o site no ar continua sendo o da Lovable (`new-corp.lovable.dev`).
