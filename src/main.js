import './style.css';
import { getPlayers, getTeamInfo } from './js/api.js';

async function main() {
    const roster = await getPlayers();
    const team = await getTeamInfo();
}
main();


const topHeader = document.getElementById("topHeader");
const logo = document.querySelector("#logo img");
const logoContainer = document.getElementById("logo");
const mainHeader = document.getElementById("mainHeader");

function handleScroll() {
    const scrollY = window.scrollY;

    if(scrollY > 80) {
        topHeader.classList.add("-translate-y-full");
        logo.classList.replace("w-40", "w-16");
        logo.classList.replace("h-40", "h-16");
        logoContainer.classList.replace("top-12", "top-1/2");
    } else {
        topHeader.classList.remove("-translate-y-full");
        logo.classList.replace("w-16", "w-40");
        logo.classList.replace("h-16", "h-40");
        logoContainer.classList.replace("top-1/2", "top-12");
    }
}

window.addEventListener("scroll", handleScroll);
handleScroll();
