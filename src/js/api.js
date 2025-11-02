import axios from 'axios';

//variables for api
const TEAM_ID = 1610612749;
const SEASON = '2025-26';
const NBA_STATS_URL = `https://stats.nba.com/stats/commonteamroster?TeamID=${TEAM_ID}&Season=${SEASON}`;
const TEAM_INFO_URL = `https://stats.nba.com/stats/teaminfocommon?TeamID=${TEAM_ID}&Season=${SEASON}`;

//get players from milwaukee in 2025-2026 season
export async function getPlayers() {
    try {
        const response = await axios.get(NBA_STATS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://stats.nba.com/',
                'Origin': 'https://stats.nba.com'
            }
        });

        const rosterData = response.data.resultSets.find(r => r.name === 'CommonTeamRoster');
        const headers = rosterData.headers;
        const rowSet = rosterData.rowSet;

        const roster = rowSet.map(playerArray => {
            const player = {};
            headers.forEach((header, i) => {
                player[header] = playerArray[i];
            });
            return player;
        });

    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
    }
}

//get team info
export async function getTeamInfo() {
    try {
        const response = await axios.get(TEAM_INFO_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://stats.nba.com/',
                'Origin': 'https://stats.nba.com',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive'
            }
        });

        const teamRow = response.data.resultSets[0].rowSet[0];
        const teamHeaders = response.data.resultSets[0].headers;

        const teamInfoRaw = {};
        teamHeaders.forEach((header, i) => {
            teamInfoRaw[header] = teamRow[i];
        });

        const teamInfoPretty = {
            id: teamInfoRaw.TEAM_ID,
            name: teamInfoRaw.TEAM_NAME,
            city: teamInfoRaw.TEAM_CITY,
            abbreviation: teamInfoRaw.TEAM_ABBREVIATION,
            conference: teamInfoRaw.TEAM_CONFERENCE,
            division: teamInfoRaw.TEAM_DIVISION,
            record: {
                wins: teamInfoRaw.W,
                losses: teamInfoRaw.L,
                winPercentage: teamInfoRaw.PCT
            },
            rank: {
                conference: teamInfoRaw.CONF_RANK,
                division: teamInfoRaw.DIV_RANK
            },
            franchiseYears: {
                start: teamInfoRaw.MIN_YEAR,
                end: teamInfoRaw.MAX_YEAR
            }
        };


    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
    }
}


// NBA Team Logo
export function getTeamLogoUrl(teamId, size = 'small') {
    const sizeMap = {
        small: 50,
        medium: 100,
        large: 500
    };

    const pixels = sizeMap[size] || 500;

    return `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`;
}

//gets 10 upcoming games
export async function getUpcomingGames() {
    try {
        const response = await axios.get('/api/nba/static/json/staticData/scheduleLeagueV2_1.json');

        const allGameDates = response.data.leagueSchedule.gameDates;
        const bucksGames = [];
        const today = new Date();

        allGameDates.forEach(dateObj => {
            dateObj.games.forEach(game => {
                const isBucksHome = game.homeTeam.teamId === TEAM_ID;
                const isBucksAway = game.awayTeam.teamId === TEAM_ID;

                if (isBucksHome || isBucksAway) {
                    const gameDate = new Date(game.gameDateTimeUTC);

                    if (gameDate >= today) {
                        bucksGames.push({
                            gameId: game.gameId,
                            date: game.gameDateTimeUTC,
                            gameLabel: game.gameLabel,
                            homeTeam: {
                                id: game.homeTeam.teamId,
                                name: game.homeTeam.teamName,
                                city: game.homeTeam.teamCity,
                                tricode: game.homeTeam.teamTricode,
                                logo: getTeamLogoUrl(game.homeTeam.teamId)
                            },
                            awayTeam: {
                                id: game.awayTeam.teamId,
                                name: game.awayTeam.teamName,
                                city: game.awayTeam.teamCity,
                                tricode: game.awayTeam.teamTricode,
                                logo: getTeamLogoUrl(game.awayTeam.teamId)
                            },
                            arena: game.arenaName,
                            city: game.arenaCity,
                            state: game.arenaState,
                            isHome: isBucksHome,
                            opponent: isBucksHome ?
                                `${game.awayTeam.teamCity} ${game.awayTeam.teamName}` :
                                `${game.homeTeam.teamCity} ${game.homeTeam.teamName}`,
                            opponentLogo: isBucksHome ?
                                getTeamLogoUrl(game.awayTeam.teamId) :
                                getTeamLogoUrl(game.homeTeam.teamId)
                        });
                    }
                }
            });
        });

        bucksGames.sort((a, b) => new Date(a.date) - new Date(b.date));
        const upcomingGames = bucksGames.slice(0, 10);

        return upcomingGames;

    } catch (err) {
        console.error('Error fetching upcoming games:', err.response ? err.response.data : err.message);
        return [];
    }
}