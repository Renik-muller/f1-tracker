import axios from 'axios';

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

// Use last completed season for standings/results data
// Update this when a new season has enough races
export const STANDINGS_YEAR = 2025;
export const SCHEDULE_YEAR = new Date().getFullYear();

const f1 = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export const getCurrentSeason = () => STANDINGS_YEAR;

export const getSchedule = async (year = SCHEDULE_YEAR) => {
    const { data } = await f1.get(`/${year}.json`);
    return data.MRData.RaceTable.Races;
};

export const getDriverStandings = async (year = getCurrentSeason()) => {
    const { data } = await f1.get(`/${year}/driverStandings.json`);
    return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
};

export const getConstructorStandings = async (year = getCurrentSeason()) => {
    const { data } = await f1.get(`/${year}/constructorStandings.json`);
    return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
};

export const getRaceResult = async (year, round) => {
    const { data } = await f1.get(`/${year}/${round}/results.json`);
    return data.MRData.RaceTable.Races[0] || null;
};

export const getLastRaceResult = async (year = getCurrentSeason()) => {
    const { data } = await f1.get(`/${year}/last/results.json`);
    return data.MRData.RaceTable.Races[0] || null;
};

export const getLapTimes = async (year, round) => {
    const allLaps = [];
    let offset = 0;
    const limit = 100;
    while (true) {
        const { data } = await f1.get(`/${year}/${round}/laps.json?limit=${limit}&offset=${offset}`);
        const laps = data.MRData.RaceTable.Races[0]?.Laps || [];
        if (laps.length === 0) break;
        allLaps.push(...laps);
        offset += limit;
        if (allLaps.length >= parseInt(data.MRData.total)) break;
    }
    return allLaps;
};

export const getDriverInfo = async (driverId) => {
    const { data } = await f1.get(`/drivers/${driverId}.json`);
    return data.MRData.DriverTable.Drivers[0] || null;
};

export const getCompletedRaces = async (year = STANDINGS_YEAR) => {
    const races = await getSchedule(year);
    const now = new Date();
    return races.filter(r => {
        const raceDate = new Date(`${r.date}T${r.time || '15:00:00'}Z`);
        return raceDate < now;
    });
};
