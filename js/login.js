// Seleciona os elementos do formulário
const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

// Valida o input do nome do jogador
const validarInput = ({ target }) => {
    // Habilita o botão se o nome tiver mais de 2 caracteres
    if (target.value.length > 2) {
        button.removeAttribute('disabled'); 
    } else {
        button.setAttribute('disabled', '');
    }
};

// Lida com o envio do formulário
const enviarResposta = (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Armazena o nome do jogador no localStorage
    localStorage.setItem('player', input.value);
    // Redireciona para a tela do jogo
    window.location = 'game.html';
};

// Adiciona eventos aos elementos
input.addEventListener('input', validarInput);
form.addEventListener('submit', enviarResposta);
