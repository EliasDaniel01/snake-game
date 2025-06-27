# 🐍 Jogo da Cobrinha (Snake Game)

Bem-vindo ao clássico **Jogo da Cobrinha** desenvolvido em HTML, CSS e JavaScript!  
Desafie seus reflexos e tente bater o seu próprio recorde!

---

## 🎮 Como Jogar

- Use as **setas do teclado** para controlar a direção da cobrinha.
- Coma a comida vermelha para crescer e ganhar pontos.
- Não bata nas paredes nem em si mesmo, ou o jogo acaba!

---

## ✨ Funcionalidades

- Interface simples e responsiva  
- Pontuação exibida em tempo real  
- Mensagem de "Fim de Jogo" ao perder  
- Sprites/Imagens customizáveis (cobra, comida, logo)  
- Feito 100% com HTML, CSS e JavaScript puro  

---

## 🚀 Executando o jogo

1. Baixe ou clone este repositório:
   ```
   git clone https://github.com/EliasDaniel01/snake-game.git
   ```
2. Abra o arquivo `index.html` no seu navegador preferido.

---

## 📂 Estrutura dos arquivos

```
snake-game/
├── index.html          # Estrutura do jogo
├── 777.css             # Estilos e visual
├── script.js           # Código JS do jogo
├── img/
│   ├── cobra-head.png  # (exemplo) Cabeça da cobra
│   ├── food.png        # (exemplo) Sprite da comida
│   └── logo.png        # (opcional) Logo na tela inicial
└── README.md
```

---

## 🖼️ Demonstração

<!-- Substitua o caminho abaixo por um gif real do seu jogo, se desejar -->
![Demonstração do jogo da cobrinha](img/demo.gif)

<!-- Exemplos de capturas de tela locais: -->
<p align="center">
  <img src="Captura de Tela (8).png" alt="Captura de Tela 8" width="350"/>
  <img src="Captura de Tela (10).png" alt="Captura de Tela 8" width="350"/>
   <img src="Captura de Tela (11).png" alt="Captura de Tela 8" width="350"/>
   <img src="Captura de Tela (12).png" alt="Captura de Tela 8" width="350"/>
   <img src="Captura de Tela (13).png" alt="Captura de Tela 8" width="350"/>
</p>

---

## 🖌️ Como usar suas imagens no jogo

- **No HTML (logo, banners, etc):**
  ```html
  <img src="img/logo.png" alt="Logo Snake Game" width="120">
  ```

- **No JavaScript (canvas):**
  ```javascript
  // Exemplo para desenhar a cabeça da cobra
  const imgCobra = new Image();
  imgCobra.src = 'img/cobra-head.png';
  imgCobra.onload = function() {
    // No loop do jogo:
    ctx.drawImage(imgCobra, x * box, y * box, box, box);
  }
  ```

- **Para comida:**
  ```javascript
  const imgFood = new Image();
  imgFood.src = 'img/food.png';
  // No desenho da comida:
  ctx.drawImage(imgFood, food.x * box, food.y * box, box, box);
  ```

Troque os nomes dos arquivos de imagem conforme os que estão no seu diretório!

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript

---

## 👨‍💻 Autor

- [Elias Daniel](https://github.com/EliasDaniel01)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Divirta-se jogando e, se quiser, contribua com melhorias!**
