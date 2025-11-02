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

        console.log('Milwaukee Bucks 2025-26 Roster:', roster);
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

        console.log(teamInfoPretty);

    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
    }
}

