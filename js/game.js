// Seleciona elementos principais da tela do jogo
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// Lista com os nomes das imagens do jogo
const trilogy = [
    'Assassinscreed', 'AssassinsCreed2', 'AssassinsCreedBrotherhood',
    'AssassinsCreedRevelations', 'AssassinsCreed3', 'blackflag',
    'Rogue', 'Unity', 'Syndicate', 'Origins',
];

// Cria elementos HTML dinamicamente
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = '';
let secondCard = '';

// Verifica se o jogo terminou
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}!
             Seu tempo foi: ${timer.innerHTML} segundos. Você desvendou o Animus e venceu o desafio. A irmandade está orgulhosa de você!`); } 
};

// Verifica se as duas cartas selecionadas são iguais
const checkCard = () => {
    const firstTrilogy = firstCard.getAttribute('data-trilogy');
    const secondTrilogy = secondCard.getAttribute('data-trilogy');

    if (firstTrilogy === secondTrilogy) {
        // Marca as cartas como desabilitadas
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();
    } else {
        // Vira as cartas novamente após meio segundo
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
};

// Revela a carta selecionada
const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCard();
    }
};

// Cria uma carta com as imagens de frente e verso
const createCard = (trilogyItem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${trilogyItem}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-trilogy', trilogyItem);

    return card;
};

// Embaralha as cartas e carrega no jogo
const loadGame = () => {
    const duplicateCharacters = [...trilogy, ...trilogy];
    const shuffledCharacters = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledCharacters.forEach((trilogyItem) => {
        const card = createCard(trilogyItem);
        grid.appendChild(card);
    });
};

// Inicia o cronômetro
const startTime = () => {
    timer.innerHTML = '0'; 
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

// Executa ao carregar a página
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
};
