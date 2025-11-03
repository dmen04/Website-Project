async function loadPlayers() {
    try {
        //json file
        const response = await fetch('/src/js/pagejs/roster.json');
        const players = await response.json();

        const container = document.getElementById('players-container');

        //player cards
        container.innerHTML = players.map(player => `
            <div class="player-card rounded-lg shadow-lg p-4 text-center w-100">
                <img src="${player.IMAGE_URL}" alt="${player.PLAYER}" class="rounded-t-lg w-full h-60 object-cover">
                <h3 class="text-3xl font-bold mt-2">${player.PLAYER}</h3>
                <p class="text-lg text-black">${player.POSITION} | #${player.NUM || 'N/A'}</p>
                <p class="text-lg text-gray-500">Height: ${player.HEIGHT} | Weight: ${player.WEIGHT} lbs</p>
                <p class="text-lg text-gray-500">Age: ${player.AGE}</p>
                <p class="text-lg text-gray-500">${player.SCHOOL || ''}</p>
            </div>
        `).join('');

    } catch (err) {
        console.error('Failed to load players:', err);
    }
}

loadPlayers();
