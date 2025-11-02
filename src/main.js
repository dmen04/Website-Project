import './style.css';
import { getPlayers, getTeamInfo } from './js/api.js';

async function main() {
    const roster = await getPlayers();
    const team = await getTeamInfo();
}

main();


