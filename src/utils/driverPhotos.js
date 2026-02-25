// Driver headshot URLs — Formula 1 official media CDN
// URL pattern: https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_320/content/dam/fom-website/drivers/{year}/{code}01_{FirstName}_{LastName}/{code}01
// Fallback to a placeholder if the URL 404s (handled by <DriverPhoto> component)

const F1_CDN = 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_320/content/dam/fom-website/drivers';

export const DRIVER_PHOTOS = {
    // 2025 grid
    max_verstappen: `${F1_CDN}/2025/max_verstappen01_Max_Verstappen/max_verstappen01.png`,
    lando_norris: `${F1_CDN}/2025/lando_norris04_Lando_Norris/lando_norris04.png`,
    charles_leclerc: `${F1_CDN}/2025/charles_leclerc16_Charles_Leclerc/charles_leclerc16.png`,
    oscar_piastri: `${F1_CDN}/2025/oscar_piastri81_Oscar_Piastri/oscar_piastri81.png`,
    carlos_sainz: `${F1_CDN}/2025/carlos_sainz55_Carlos_Sainz/carlos_sainz55.png`,
    george_russell: `${F1_CDN}/2025/george_russell63_George_Russell/george_russell63.png`,
    lewis_hamilton: `${F1_CDN}/2025/lewis_hamilton44_Lewis_Hamilton/lewis_hamilton44.png`,
    kimi_antonelli: `${F1_CDN}/2025/kimi_antonelli12_Kimi_Antonelli/kimi_antonelli12.png`,
    fernando_alonso: `${F1_CDN}/2025/fernando_alonso14_Fernando_Alonso/fernando_alonso14.png`,
    lance_stroll: `${F1_CDN}/2025/lance_stroll18_Lance_Stroll/lance_stroll18.png`,
    pierre_gasly: `${F1_CDN}/2025/pierre_gasly10_Pierre_Gasly/pierre_gasly10.png`,
    jack_doohan: `${F1_CDN}/2025/jack_doohan07_Jack_Doohan/jack_doohan07.png`,
    esteban_ocon: `${F1_CDN}/2025/esteban_ocon31_Esteban_Ocon/esteban_ocon31.png`,
    nico_hulkenberg: `${F1_CDN}/2025/nico_hulkenberg27_Nico_Hulkenberg/nico_hulkenberg27.png`,
    oliver_bearman: `${F1_CDN}/2025/oliver_bearman87_Oliver_Bearman/oliver_bearman87.png`,
    isack_hadjar: `${F1_CDN}/2025/isack_hadjar06_Isack_Hadjar/isack_hadjar06.png`,
    yuki_tsunoda: `${F1_CDN}/2025/yuki_tsunoda22_Yuki_Tsunoda/yuki_tsunoda22.png`,
    liam_lawson: `${F1_CDN}/2025/liam_lawson30_Liam_Lawson/liam_lawson30.png`,
    alexander_albon: `${F1_CDN}/2025/alexander_albon23_Alexander_Albon/alexander_albon23.png`,
    franco_colapinto: `${F1_CDN}/2025/franco_colapinto43_Franco_Colapinto/franco_colapinto43.png`,
};

export function getDriverPhoto(driverId) {
    return DRIVER_PHOTOS[driverId] || null;
}

// Initials fallback
export function getDriverInitials(givenName, familyName) {
    return `${givenName?.[0] || '?'}${familyName?.[0] || '?'}`;
}
