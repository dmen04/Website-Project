import './style.css';
import { getUpcomingGames } from './js/api.js';
import { initHeaderScroll } from './js/header.js';
import { displayGames } from "./js/displaygames.js";
import { initBurgerMenu } from './js/burger.js';

async function main() {
    initHeaderScroll();
    initBurgerMenu();
    try {
        const upcomingGames = await getUpcomingGames();

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