# Jogo 2D — Three.js e Rapier

As pastas e os ficheiros de código da ficha já estão criados.
As imagens e os sons fornecidos pelo professor NÃO estão incluídos.

## Abrir no VS Code

1. Extrai o ZIP (botão direito → Extrair Tudo).
2. No VS Code, escolhe File → Open Folder e abre a pasta jogo2d que contém package.json.
3. Copia os assets do Moodle para public/assets, mantendo as subpastas e os nomes.

O código procura estas imagens:

| Ficheiro | Pasta de destino |
| --- | --- |
| BG.png | public/assets/Sprites/Objects |
| 1.png, 2.png, 3.png | public/assets/Sprites/Parts |
| Idle (1).png | public/assets/Sprites/Player |

Não cries ficheiros de texto com nomes de imagens: copia as imagens reais.
Se o download do Moodle contiver a pasta Sprites, copia-a para public/assets.
Evita uma pasta extra como public/assets/Assets/Sprites.

4. Abre Terminal → New Terminal e executa, um comando de cada vez:

```bash
npm install
npm run dev
```

O browser abre o nível automaticamente. Se não abrir, usa o endereço apresentado
no terminal (normalmente http://localhost:5173/).
Para parar o servidor, carrega em Ctrl+C.

## Resultado esperado

Quatro plataformas e um jogador que cai devido à gravidade e colide com a
plataforma inferior. As caixas de colisão aparecem a verde. Esta ficha não
implementa movimento por teclado nem animações do jogador.

Se faltar uma imagem, aparece um aviso com o caminho do ficheiro a copiar.
Depois de copiar os assets, atualiza a página. Na consola (F12 → Console)
podes consultar a hierarquia de objetos.

## Organização

- public/assets/Sprites: Objects, Parts e Player.
- public/assets/Sounds: sons do professor.
- src/Animation: reservado para animações.
- src/Materials/sprite.js: criação dos sprites.
- src/Prefabs: background e plataformas reutilizáveis.
- src/Scenes/nivel1.js: cenário e ciclo de jogo.
- src/Scripts: física e desenho das caixas de colisão.
- index.html: página inicial que abre diretamente no endereço do servidor.
- vite.config.js: configuração de build da página index.html.

## Experiência final: sensores

Os comentários de Fisica.js e nivel1.js indicam as alterações para experimentar
sensores e eventos de colisão. Descomenta as linhas assinaladas nos dois ficheiros,
substitui fisica.step() por fisica.step(eventos) e observa a consola. O jogador
passará a atravessar as plataformas. No final, volta a comentar a experiência.

## Criar a versão final

```bash
npm run build
npm run preview
```

Os ficheiros finais ficam em dist. O ZIP não inclui node_modules: npm install
cria essa pasta no teu computador. Precisas de Node.js e npm instalados.
