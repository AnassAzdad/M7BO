let deck = [], playerHand = [], opponentHand = [], pile = [], currentPlayer = 'player', gameOver = false;
const suits = { 'hearts': '♥', 'diamonds': '♦', 'clubs': '♣', 'spades': '♠' };

function initGame() {
    gameOver = false; currentPlayer = 'player';
    deck = []; 
    for (let suit in suits) for (let v of ['2','3','4','5','6','7','8','9','10','J','Q','K','A']) deck.push({ suit, value: v });
    deck = shuffle(deck);
    playerHand = deck.splice(0, 7); opponentHand = deck.splice(0, 7); pile = [deck.shift()];
    document.getElementById('winner').classList.add('hidden');
    renderGame();
}

function shuffle(arr) {
    let i = arr.length;
    while (i) {
        const r = Math.floor(Math.random() * i--);
        [arr[i], arr[r]] = [arr[r], arr[i]];
    }
    return arr;
}

function renderGame() {
    const oppEl = document.getElementById('opponent-hand');
    oppEl.innerHTML = ''; opponentHand.forEach(() => {
        const el = document.createElement('div');
        el.className = 'card-back'; oppEl.appendChild(el);
    });

    const playerEl = document.getElementById('player-hand');
    playerEl.innerHTML = ''; playerHand.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = `card ${card.suit}`;
        el.innerHTML = `<div class="card-top"><div>${card.value}</div><div>${suits[card.suit]}</div></div>
                        <div class="card-center">${suits[card.suit]}</div>
                        <div class="card-bottom"><div>${card.value}</div><div>${suits[card.suit]}</div></div>`;
        el.onclick = () => playCard(i); playerEl.appendChild(el);
    });

    const topCard = pile[pile.length - 1], pileEl = document.getElementById('pile');
    pileEl.className = `pile ${topCard.suit}`;
    pileEl.innerHTML = `<div class="card-top"><div>${topCard.value}</div><div>${suits[topCard.suit]}</div></div>`;

    document.getElementById('deck').onclick = drawCard;
    document.getElementById('status').textContent = currentPlayer === 'player' 
        ? "Your turn! Play a matching card or draw from the deck." 
        : "Computer's turn...";
    
    if (currentPlayer === 'opponent' && !gameOver) setTimeout(opponentPlay, 1000);
    checkWinner();
}

function playCard(i) {
    if (currentPlayer !== 'player' || gameOver) return;
    const card = playerHand[i], top = pile[pile.length - 1];
    if (card.suit === top.suit || card.value === top.value) {
        pile.push(playerHand.splice(i, 1)[0]);
        currentPlayer = 'opponent'; renderGame();
    } else alert("You can't play that card! Choose one with the same suit or value.");
}

function drawCard() {
    if (currentPlayer !== 'player' || gameOver) return;
    if (deck.length) {
        playerHand.push(deck.shift());
        currentPlayer = 'opponent'; renderGame();
    } else alert("The deck is empty!");
}

function opponentPlay() {
    if (gameOver) return;
    const top = pile[pile.length - 1];
    const idx = opponentHand.findIndex(c => c.suit === top.suit || c.value === top.value);
    if (idx !== -1) {
        const played = opponentHand.splice(idx, 1)[0];
        pile.push(played);
        document.getElementById('status').textContent = `Computer played ${played.value} of ${played.suit}`;
    } else if (deck.length) {
        opponentHand.push(deck.shift());
        document.getElementById('status').textContent = "Computer drew a card";
    } else {
        document.getElementById('status').textContent = "Computer has no moves";
    }
    currentPlayer = 'player'; renderGame();
}

function checkWinner() {
    if (playerHand.length === 0) {
        gameOver = true;
        document.getElementById('winner').classList.remove('hidden');
        document.getElementById('winner-text').textContent = "You Win!";
    } else if (opponentHand.length === 0) {
        gameOver = true;
        document.getElementById('winner').classList.remove('hidden');
        document.getElementById('winner-text').textContent = "Computer Wins!";
    }
}
document.getElementById('play-again').addEventListener('click', initGame);
window.onload = initGame;
