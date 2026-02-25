import { useState, useEffect } from 'react';
import {
    getSchedule,
    getDriverStandings,
    getConstructorStandings,
    getRaceResult,
    getLastRaceResult,
    getCompletedRaces,
    getCurrentSeason,
    SCHEDULE_YEAR,
} from '../api/f1Api';

function useAsync(asyncFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        asyncFn()
            .then(result => { if (!cancelled) { setData(result); setLoading(false); } })
            .catch(err => { if (!cancelled) { setError(err); setLoading(false); } });
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}

export const useSchedule = (year = SCHEDULE_YEAR) =>
    useAsync(() => getSchedule(year), [year]);

export const useDriverStandings = (year = getCurrentSeason()) =>
    useAsync(() => getDriverStandings(year), [year]);

export const useConstructorStandings = (year = getCurrentSeason()) =>
    useAsync(() => getConstructorStandings(year), [year]);

export const useLastRaceResult = (year = getCurrentSeason()) =>
    useAsync(() => getLastRaceResult(year), [year]);

export const useRaceResult = (year, round) =>
    useAsync(() => getRaceResult(year, round), [year, round]);

export const useCompletedRaces = (year = getCurrentSeason()) =>
    useAsync(() => getCompletedRaces(year), [year]);
