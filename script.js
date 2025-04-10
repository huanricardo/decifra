// Lista de palavras com dicas
const palavrasComDicas = [

  { palavra: "cobra", dica: "animal" },
  { palavra: "tigre", dica: "animal" },
  { palavra: "lince", dica: "animal" },
  { palavra: "panda", dica: "animal" },
  { palavra: "águia", dica: "animal" },
  { palavra: "arara", dica: "animal" },
  { palavra: "coala", dica: "animal" },

  { palavra: "garfo", dica: "objeto" },
  { palavra: "pente", dica: "objeto" },
  { palavra: "livro", dica: "objeto" },
  { palavra: "prato", dica: "objeto" },
  { palavra: "anzol", dica: "objeto" },
  { palavra: "cofre", dica: "objeto" },
  { palavra: "gorro", dica: "objeto" },

  { palavra: "praia", dica: "lugar" },
  { palavra: "campo", dica: "lugar" },
  { palavra: "serra", dica: "lugar" },
  { palavra: "porto", dica: "lugar" },
  { palavra: "feira", dica: "lugar" },
  { palavra: "morro", dica: "lugar" },
  { palavra: "feira", dica: "lugar" },
  { palavra: "hotel", dica: "lugar" },

  { palavra: "pizza", dica: "comida" },
  { palavra: "arroz", dica: "comida" },
  { palavra: "sushi", dica: "comida" },
  { palavra: "carne", dica: "comida" },
  { palavra: "pudim", dica: "comida" },
  { palavra: "bacon", dica: "comida" },
  { palavra: "manga", dica: "comida" },

  { palavra: "apple", dica: "marca" },
  { palavra: "nokia", dica: "marca" },
  { palavra: "honda", dica: "marca" },
  { palavra: "pepsi", dica: "marca" },
  { palavra: "canon", dica: "marca" },
  { palavra: "bosch", dica: "marca" },
  { palavra: "intel", dica: "marca" },

  { palavra: "comer", dica: "verbo" },
  { palavra: "beber", dica: "verbo" },
  { palavra: "pular", dica: "verbo" },
  { palavra: "andar", dica: "verbo" },
  { palavra: "gozar", dica: "verbo" },
  { palavra: "gerar", dica: "verbo" },

  { palavra: "verde", dica: "cor" },
  { palavra: "preto", dica: "cor" },
  { palavra: "cinza", dica: "cor" },
  { palavra: "azul", dica: "cor" },
  { palavra: "lilás", dica: "cor" },

  { palavra: "nariz", dica: "corpo" },
  { palavra: "testa", dica: "corpo" },
  { palavra: "perna", dica: "corpo" },
  { palavra: "ombro", dica: "corpo" },
  { palavra: "bunda", dica: "corpo" },
  { palavra: "punho", dica: "corpo" },
  { palavra: "unhas", dica: "corpo" },

  { palavra: "skate", dica: "esporte" },
  { palavra: "rugby", dica: "esporte" },
  { palavra: "surfe", dica: "esporte" },
  { palavra: "tenis", dica: "esporte" },
  { palavra: "volei", dica: "esporte" },
  { palavra: "golfe", dica: "esporte" },

  { palavra: "feliz", dica: "adjetivo" },
  { palavra: "bravo", dica: "adjetivo" },
  { palavra: "doido", dica: "adjetivo" },
  { palavra: "meigo", dica: "adjetivo" },
  { palavra: "calmo", dica: "adjetivo" },
  { palavra: "lindo", dica: "adjetivo" },
  { palavra: "ruivo", dica: "adjetivo" }
];

// Sorteia uma palavra com dica
const sorteado = palavrasComDicas[Math.floor(Math.random() * palavrasComDicas.length)];
const palavraSecreta = sorteado.palavra.toUpperCase();
const dica = sorteado.dica;
const maxAttempts = 5;
let currentAttempt = 0;

// Exibe a dica no HTML
document.getElementById("dica").textContent = "Dica: " + dica;

// Cria o tabuleiro: 5 linhas com 5 células cada
const game = document.getElementById("game");
for (let i = 0; i < maxAttempts; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
  }
  game.appendChild(row);
}

// Função para verificar o palpite
function checkGuess() {
  const input = document.getElementById("input");
  const guess = input.value.toUpperCase();

  if (guess.length !== 5) {
      document.getElementById("message").textContent = "A palavra deve ter 5 letras.";
      return;
  }

  if (currentAttempt >= maxAttempts) return;

  const row = game.children[currentAttempt];
  const secretLetters = palavraSecreta.split("");
  const guessLetters = guess.split("");
  const letterCount = {}; // conta de cada letra na palavra secreta

  // Conta as letras da palavra secreta
  for (let letter of secretLetters) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  // Primeiro, marca as letras corretas na posição certa
  for (let i = 0; i < 5; i++) {
      const cell = row.children[i];
      const letter = guessLetters[i];
      cell.textContent = letter;

      if (letter === secretLetters[i]) {
          cell.classList.add("correct");
          letterCount[letter]--;
          guessLetters[i] = null; // evita contagem dupla
      }
  }

  // Depois, marca as letras presentes em posições erradas
  for (let i = 0; i < 5; i++) {
      const cell = row.children[i];
      const letter = guessLetters[i];
      if (letter && secretLetters.includes(letter) && letterCount[letter] > 0) {
          cell.classList.add("present");
          letterCount[letter]--;
      } else if (letter) {
          cell.classList.add("absent");
      }
  }

  currentAttempt++;
  input.value = "";

  if (guess === palavraSecreta) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "🥳 Parabéns! Você decifrou a palavra!";
    messageElement.classList.add("mensagem-comemorativa");
    input.disabled = true;

    // Confete 🎉
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove("mensagem-comemorativa");
    }, 3000);
} else if (currentAttempt === maxAttempts) {
      document.getElementById("message").textContent = `Fim de jogo! A palavra era ${palavraSecreta}.`;
      input.disabled = true;
  }
}

// Permite que a tecla ENTER verifique o palpite
document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      checkGuess();
  }
});

function reiniciarJogo() {
  window.location.reload();
}