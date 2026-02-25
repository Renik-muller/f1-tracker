// Team logo URLs (Wikimedia Commons — direct embed allowed)
// + CSS badge fallback for any missing
export const TEAM_LOGOS = {
    red_bull: 'https://upload.wikimedia.org/wikipedia/en/4/4e/Red_Bull_Racing_logo.svg',
    mclaren: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg',
    ferrari: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Scuderia_Ferrari_Logo.svg',
    mercedes: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Mercedes_AMG_Petronas_F1_Logo.svg',
    aston_martin: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Martin_F1_Team_logo.svg',
    alpine: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Alpine_F1_Team_Logo.svg',
    haas: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Haas_F1_Team_logo.svg',
    rb: 'https://upload.wikimedia.org/wikipedia/commons/6/60/RB_F1_Team_logo.svg',
    williams: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Williams_Racing_logo.svg',
    sauber: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Stake_F1_Team_Logo.svg',
    // 2026
    cadillac: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Cadillac_logo.svg/200px-Cadillac_logo.svg.png',
    // Legacy fallback IDs
    alphatauri: 'https://upload.wikimedia.org/wikipedia/commons/6/60/RB_F1_Team_logo.svg',
    alfa: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Stake_F1_Team_Logo.svg',
};

export const TEAM_ABBR = {
    red_bull: 'RBR', mclaren: 'MCL', ferrari: 'FER',
    mercedes: 'MER', aston_martin: 'AMR', alpine: 'ALP',
    haas: 'HAS', rb: 'RB', williams: 'WIL',
    sauber: 'SAU', cadillac: 'CAD', alphatauri: 'RB',
    alfa: 'SAU',
};

export function getTeamLogo(constructorId) {
    if (!constructorId) return null;
    return TEAM_LOGOS[constructorId.toLowerCase()] || null;
}

export function getTeamAbbr(constructorId) {
    if (!constructorId) return '?';
    return TEAM_ABBR[constructorId.toLowerCase()] || constructorId.slice(0, 3).toUpperCase();
}
