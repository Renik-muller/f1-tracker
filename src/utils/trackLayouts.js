// Circuit SVG layouts from Wikimedia Commons (reliable, embeddable)
// Using PNG thumbnails from Wikimedia for consistent loading
const WM = 'https://upload.wikimedia.org/wikipedia/commons/thumb';

export const TRACK_LAYOUTS = {
    albert_park: `${WM}/8/8e/Albert_Park_circuit_map.svg/400px-Albert_Park_circuit_map.svg.png`,
    shanghai: `${WM}/6/6e/Shanghai_Circuit_labeled.svg/400px-Shanghai_Circuit_labeled.svg.png`,
    suzuka: `${WM}/1/1a/Suzuka_circuit_map.svg/400px-Suzuka_circuit_map.svg.png`,
    bahrain: `${WM}/1/10/Bahrain_International_Circuit--Sakhir--map.svg/400px-Bahrain_International_Circuit--Sakhir--map.svg.png`,
    jeddah: `${WM}/3/3d/Jeddah_Street_Circuit_2021.svg/400px-Jeddah_Street_Circuit_2021.svg.png`,
    miami: `${WM}/5/58/Miami_International_Autodrome_map.svg/400px-Miami_International_Autodrome_map.svg.png`,
    imola: `${WM}/5/5d/Autodromo_Enzo_e_Dino_Ferrari_map.svg/400px-Autodromo_Enzo_e_Dino_Ferrari_map.svg.png`,
    monaco: `${WM}/5/52/Monte_Carlo_Formula_1_track_map.svg/400px-Monte_Carlo_Formula_1_track_map.svg.png`,
    villeneuve: `${WM}/a/a0/Circuit_Gilles_Villeneuve_track_map.svg/400px-Circuit_Gilles_Villeneuve_track_map.svg.png`,
    catalunya: `${WM}/1/13/Circuit_de_Barcelona-Catalunya_track_map.svg/400px-Circuit_de_Barcelona-Catalunya_track_map.svg.png`,
    red_bull_ring: `${WM}/7/7e/Red_Bull_Ring_track_map.svg/400px-Red_Bull_Ring_track_map.svg.png`,
    silverstone: `${WM}/7/71/Silverstone_Circuit_2010.svg/400px-Silverstone_Circuit_2010.svg.png`,
    hungaroring: `${WM}/a/a3/Hungaroring_track_map.svg/400px-Hungaroring_track_map.svg.png`,
    spa: `${WM}/b/b8/Spa-Francorchamps_track_map.svg/400px-Spa-Francorchamps_track_map.svg.png`,
    zandvoort: `${WM}/3/37/Circuit_Zandvoort_track_map.svg/400px-Circuit_Zandvoort_track_map.svg.png`,
    monza: `${WM}/b/bb/Monza_track_map.svg/400px-Monza_track_map.svg.png`,
    baku: `${WM}/6/6e/Baku_Formula_One_circuit_2016.svg/400px-Baku_Formula_One_circuit_2016.svg.png`,
    marina_bay: `${WM}/e/e5/Singapore_street_circuit_2012.svg/400px-Singapore_street_circuit_2012.svg.png`,
    americas: `${WM}/5/51/Austin_circuit_of_the_americas.svg/400px-Austin_circuit_of_the_americas.svg.png`,
    rodriguez: `${WM}/4/44/Mexico_City_circuit_map.svg/400px-Mexico_City_circuit_map.svg.png`,
    interlagos: `${WM}/a/a8/Autódromo_José_Carlos_Pace_track_map.svg/400px-Autódromo_José_Carlos_Pace_track_map.svg.png`,
    las_vegas: `${WM}/1/1a/Las_Vegas_Street_Circuit_2023.svg/400px-Las_Vegas_Street_Circuit_2023.svg.png`,
    losail: `${WM}/7/7a/Losail_International_Circuit_track_map.svg/400px-Losail_International_Circuit_track_map.svg.png`,
    yas_marina: `${WM}/9/9a/Yas_Marina_Circuit_2021_F1_weekend_map.svg/400px-Yas_Marina_Circuit_2021_F1_weekend_map.svg.png`,
};

export function getTrackLayout(circuitId) {
    return TRACK_LAYOUTS[circuitId] || null;
}

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
