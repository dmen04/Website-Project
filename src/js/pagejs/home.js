import { getUpcomingGames } from '/src/js/api.js';

// display games
async function initHomePageGames() {
    try {
        const games = await getUpcomingGames();

        if (!games || games.length === 0) {
            console.log('No games found');
            return;
        }

        const section = document.querySelector('section.py-12');
        if (!section) {
            console.error('SECTION NOT FOUND');
            return;
        }

        section.innerHTML = `
            <div class="w-full max-w-full">
                <h2 class="text-4xl font-bold mb-6">Upcoming Games</h2>
                <div class="games-container flex gap-6 overflow-x-scroll overflow-y-hidden pb-4 px-6 cursor-grab active:cursor-grabbing"></div>
            </div>
        `;

        const gamesContainer = section.querySelector('.games-container');

        let isDown = false;
        let startX;
        let scrollLeft;

        gamesContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            gamesContainer.classList.add('active');
            startX = e.pageX - gamesContainer.offsetLeft;
            scrollLeft = gamesContainer.scrollLeft;
        });

        gamesContainer.addEventListener('mouseleave', () => {
            isDown = false;
            gamesContainer.classList.remove('active');
        });

        gamesContainer.addEventListener('mouseup', () => {
            isDown = false;
            gamesContainer.classList.remove('active');
        });

        gamesContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gamesContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            gamesContainer.scrollLeft = scrollLeft - walk;
        });

        games.forEach(game => {
            const gameDate = new Date(game.date);
            const formattedDate = gameDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            const formattedTime = gameDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            });

            const gameCard = document.createElement('div');
            gameCard.className = 'bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow flex-shrink-0 w-80 select-none';
            gameCard.innerHTML = `
                <div class="flex items-center gap-6 justify-center mb-4">
                    <div class="text-center">
                        <img src="${game.isHome ? 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg' : game.opponentLogo}" 
                             alt="${game.isHome ? 'Milwaukee Bucks' : game.opponent}" 
                             class="w-16 h-16 mb-2 mx-auto">
                        <p class="font-bold text-xs">${game.isHome ? 'MIL' : game.awayTeam.tricode}</p>
                    </div>
                    
                    <div class="text-center">
                        <p class="text-2xl font-bold">${game.isHome ? 'VS' : '@'}</p>
                    </div>
                    
                    <div class="text-center">
                        <img src="${game.isHome ? game.opponentLogo : 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg'}" 
                             alt="${game.isHome ? game.opponent : 'Milwaukee Bucks'}" 
                             class="w-16 h-16 mb-2 mx-auto">
                        <p class="font-bold text-xs">${game.isHome ? game.awayTeam.tricode : 'MIL'}</p>
                    </div>
                </div>
                <div class="border-t pt-4">
                    <p class="text-sm font-semibold text-gray-800">${formattedDate}</p>
                    <p class="text-sm text-gray-600">${formattedTime}</p>
                    <p class="text-xs text-gray-500 mt-2">${game.arena}</p>
                    <p class="text-xs text-gray-500">${game.city}, ${game.state}</p>
                </div>
            `;

            gamesContainer.appendChild(gameCard);
        });

    } catch (error) {
        console.error('Error fetching or displaying games:', error);
    }
}

initHomePageGames();
