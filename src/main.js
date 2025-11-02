import './style.css';
import { getPlayers, getTeamInfo, getUpcomingGames  } from './js/api.js';
import { initHeaderScroll } from './js/header.js';

async function main() {
    initHeaderScroll();

    const roster = await getPlayers();
    const team = await getTeamInfo();
    const upcomingGames = await getUpcomingGames();
}
main();