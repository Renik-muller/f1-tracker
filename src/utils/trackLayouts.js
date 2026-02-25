// Circuit ID → track layout SVG URL (from bacinger/f1-circuits on GitHub)
// Each key matches the circuit's Ergast/Jolpica circuitId
const BASE = 'https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits';

export const TRACK_LAYOUTS = {
    albert_park: `${BASE}/au-2011.svg`,
    shanghai: `${BASE}/cn-2004.svg`,
    suzuka: `${BASE}/jp-1987.svg`,
    bahrain: `${BASE}/bh-2004.svg`,
    jeddah: `${BASE}/sa-2021.svg`,
    miami: `${BASE}/us-2022.svg`,
    imola: `${BASE}/it-2020.svg`,
    monaco: `${BASE}/mc-1966.svg`,
    villeneuve: `${BASE}/ca-1978.svg`,
    catalunya: `${BASE}/es-1991.svg`,
    red_bull_ring: `${BASE}/at-1997.svg`,
    silverstone: `${BASE}/gb-1987.svg`,
    hungaroring: `${BASE}/hu-1986.svg`,
    spa: `${BASE}/be-1979.svg`,
    zandvoort: `${BASE}/nl-2020.svg`,
    monza: `${BASE}/it-1950.svg`,
    baku: `${BASE}/az-2016.svg`,
    marina_bay: `${BASE}/sg-2008.svg`,
    americas: `${BASE}/us-2012.svg`,
    rodriguez: `${BASE}/mx-1962.svg`,
    interlagos: `${BASE}/br-1984.svg`,
    las_vegas: `${BASE}/us-2023.svg`,
    losail: `${BASE}/qa-2004.svg`,
    yas_marina: `${BASE}/ae-2009.svg`,
};

export function getTrackLayout(circuitId) {
    return TRACK_LAYOUTS[circuitId] || null;
}

// Extra circuit info beyond what the API returns
export const CIRCUIT_INFO = {
    albert_park: { laps: 58, length: '5.278 km', turns: 16 },
    shanghai: { laps: 56, length: '5.451 km', turns: 16 },
    suzuka: { laps: 53, length: '5.807 km', turns: 18 },
    bahrain: { laps: 57, length: '5.412 km', turns: 15 },
    jeddah: { laps: 50, length: '6.174 km', turns: 27 },
    miami: { laps: 57, length: '5.412 km', turns: 19 },
    imola: { laps: 63, length: '4.909 km', turns: 19 },
    monaco: { laps: 78, length: '3.337 km', turns: 19 },
    villeneuve: { laps: 70, length: '4.361 km', turns: 14 },
    catalunya: { laps: 66, length: '4.675 km', turns: 16 },
    red_bull_ring: { laps: 71, length: '4.318 km', turns: 10 },
    silverstone: { laps: 52, length: '5.891 km', turns: 18 },
    hungaroring: { laps: 70, length: '4.381 km', turns: 14 },
    spa: { laps: 44, length: '7.004 km', turns: 19 },
    zandvoort: { laps: 72, length: '4.259 km', turns: 14 },
    monza: { laps: 53, length: '5.793 km', turns: 11 },
    baku: { laps: 51, length: '6.003 km', turns: 20 },
    marina_bay: { laps: 62, length: '4.940 km', turns: 23 },
    americas: { laps: 56, length: '5.513 km', turns: 20 },
    rodriguez: { laps: 71, length: '4.304 km', turns: 17 },
    interlagos: { laps: 71, length: '4.309 km', turns: 15 },
    las_vegas: { laps: 50, length: '6.201 km', turns: 17 },
    losail: { laps: 57, length: '5.380 km', turns: 16 },
    yas_marina: { laps: 58, length: '5.281 km', turns: 16 },
};
