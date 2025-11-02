import './style.css';
import { getUpcomingGames } from './js/api.js';
import { initHeaderScroll } from './js/header.js';
import { displayGames } from "./js/displaygames.js";

async function main() {
    console.log('Main started');

    initHeaderScroll();

    console.log('About to fetch upcoming games...');
    try {
        const upcomingGames = await getUpcomingGames();
        console.log('Upcoming games received:', upcomingGames);

        if (upcomingGames && upcomingGames.length > 0) {
            displayGames(upcomingGames);
        } else {
            console.log('No games found');
        }
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

main();