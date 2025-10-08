// --- CÓDIGO JAVASCRIPT PARA O EFEITO MATRIX (CHUVA DE CÓDIGO) ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Garante que o canvas ocupe a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres usados no efeito (Katakana, binário, símbolos)
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()!{}[]|;:,.<>/?";
const chars = matrixChars.split('');

const fontSize = 16;

// Variáveis declaradas com 'let' para permitir o recálculo no resize
let columns = canvas.width / fontSize;
let drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1; // Começa na primeira linha
}

// Função principal de desenho e animação
function drawMatrix() {
    // Fundo preto semi-transparente para o efeito de "desvanecimento"
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estilo do texto (verde)
    ctx.fillStyle = '#00FF00'; // Cor verde neon para os caracteres
    ctx.font = `${fontSize}px monospace`;

    // Desenha cada coluna de código
    for (let i = 0; i < drops.length; i++) {
        // Seleciona um caractere aleatório
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Posição X (coluna) e Posição Y (linha)
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Desenha o caractere
        ctx.fillText(text, x, y);

        // Re-inicializa a coluna quando ela atinge o final da tela OU aleatoriamente
        // O `Math.random()` cria o efeito de "chuva" de código irregular
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Incrementa a posição Y para mover o caractere para baixo
        drops[i]++;
    }
}

// Redimensiona o canvas quando a janela é redimensionada
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalcula o número de colunas e o array de drops
    columns = canvas.width / fontSize;
    drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
});

// Loop principal de animação (chama drawMatrix 20 vezes por segundo)
setInterval(drawMatrix, 50); // 50ms = 20 quadros por segundo
