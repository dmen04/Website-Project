import './style.css';
import { getPlayers, getTeamInfo } from './js/api.js';
import { initHeaderScroll } from './js/header.js';

async function main() {
    initHeaderScroll();

    const roster = await getPlayers();
    const team = await getTeamInfo();
}
main();