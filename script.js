// Variáveis de Estado
let targetNumber = 0;
let minRange = 0;
let maxRange = 0;
let attempts = 0;

// Elementos do DOM
const setupPhase = document.getElementById('setupPhase');
const guessPhase = document.getElementById('guessPhase');
const feedback = document.getElementById('feedback');
const taoSymbol = document.getElementById('taoSymbol');

// Função para iniciar o jogo (Gerar o Tao)
function generateTao() {
    const minInput = document.getElementById('minVal');
    const maxInput = document.getElementById('maxVal');

    minRange = parseInt(minInput.value);
    maxRange = parseInt(maxInput.value);

    // Validação simples
    if (isNaN(minRange) || isNaN(maxRange) || minRange >= maxRange) {
        feedback.style.color = "#b92b27";
        feedback.textContent = "O equilíbrio requer que o fim seja maior que o início.";
        return;
    }

    // Gerar número aleatório
    targetNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = 0;

    // Transição de tela
    setupPhase.classList.add('hidden');
    guessPhase.classList.remove('hidden');
    
    document.getElementById('displayMin').textContent = minRange;
    document.getElementById('displayMax').textContent = maxRange;
    
    // Limpar feedback e input anterior
    feedback.textContent = "";
    document.getElementById('userGuess').value = "";
    document.getElementById('userGuess').focus();

    // Efeito visual no logo
    taoSymbol.classList.add('spinning');
    setTimeout(() => taoSymbol.classList.remove('spinning'), 500);
}

// Função para verificar o palpite
function makeGuess() {
    const guessInput = document.getElementById('userGuess');
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess)) {
        feedback.textContent = "O vazio não é uma resposta.";
        return;
    }

    attempts++;

    // Lógica do jogo com linguagem temática
    if (userGuess === targetNumber) {
        victory();
    } else if (userGuess < targetNumber) {
        feedback.style.color = "#2c2c2c";
        feedback.innerHTML = "A energia está <strong>baixa</strong>. Eleve-se.";
        animateFeedback('up');
    } else {
        feedback.style.color = "#2c2c2c";
        feedback.innerHTML = "A energia está <strong>alta</strong>. Acalme-se.";
        animateFeedback('down');
    }
    
    guessInput.value = "";
    guessInput.focus();
}

// Função de Vitória
function victory() {
    feedback.style.color = "#d4af37"; // Dourado
    feedback.innerHTML = `Harmonia alcançada! O número era ${targetNumber}.<br><span style="font-size:0.8rem; color:#888">Tentativas: ${attempts}</span>`;
    
    // Animação de sucesso
    taoSymbol.classList.add('success-anim');
    
    // Desabilitar input temporariamente
    document.getElementById('userGuess').disabled = true;
}

// Permitir pressionar Enter para enviar
function checkEnter(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
}

// Reiniciar o jogo
function resetGame() {
    setupPhase.classList.remove('hidden');
    guessPhase.classList.add('hidden');
    feedback.textContent = "";
    document.getElementById('userGuess').disabled = false;
    taoSymbol.classList.remove('success-anim');
}

// Pequena animação no feedback
function animateFeedback(direction) {
    feedback.animate([
        { transform: 'translateY(0)', opacity: 0.5 },
        { transform: 'translateY(0)', opacity: 1 }
    ], {
        duration: 300
    });
}