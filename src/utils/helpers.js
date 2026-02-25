// ── Team Colors ──────────────────────────────────────────────────
export const TEAM_COLORS = {
    red_bull: '#3671C6',
    mclaren: '#FF8000',
    ferrari: '#E8002D',
    mercedes: '#27F4D2',
    aston_martin: '#229971',
    alpine: '#FF87BC',
    haas: '#B6BABD',
    rb: '#6692FF',
    williams: '#64C4FF',
    sauber: '#52E252',
    // Legacy / fallback
    alphatauri: '#5E8FAA',
    alfa: '#C92D4B',
    renault: '#FFF500',
    force_india: '#F596C8',
    racing_point: '#F596C8',
    toro_rosso: '#469BFF',
};

export function getTeamColor(constructorId) {
    if (!constructorId) return '#E10600';
    const key = constructorId.toLowerCase().replace(/[^a-z_]/g, '_');
    return TEAM_COLORS[key] || '#888888';
}

// ── Country Flags (emoji) ─────────────────────────────────────────
const FLAGS = {
    british: '🇬🇧', dutch: '🇳🇱', monegasque: '🇲🇨',
    australian: '🇦🇺', spanish: '🇪🇸', german: '🇩🇪',
    french: '🇫🇷', mexican: '🇲🇽', canadian: '🇨🇦',
    finnish: '🇫🇮', japanese: '🇯🇵', chinese: '🇨🇳',
    danish: '🇩🇰', thai: '🇹🇭', american: '🇺🇸',
    italian: '🇮🇹', austrian: '🇦🇹', swiss: '🇨🇭',
    new_zealander: '🇳🇿', argentinian: '🇦🇷', bahraini: '🇧🇭',
    // Countries (circuit locations)
    UK: '🇬🇧', Netherlands: '🇳🇱', Monaco: '🇲🇨',
    Australia: '🇦🇺', Spain: '🇪🇸', Germany: '🇩🇪',
    France: '🇫🇷', Mexico: '🇲🇽', Canada: '🇨🇦',
    Bahrain: '🇧🇭', Japan: '🇯🇵', China: '🇨🇳',
    Italy: '🇮🇹', Austria: '🇦🇹', Hungary: '🇭🇺',
    Belgium: '🇧🇪', Singapore: '🇸🇬', USA: '🇺🇸',
    'United States': '🇺🇸', Brazil: '🇧🇷', UAE: '🇦🇪',
    'Abu Dhabi': '🇦🇪', Saudi: '🇸🇦', 'Saudi Arabia': '🇸🇦',
    Azerbaijan: '🇦🇿', Qatar: '🇶🇦', Portugal: '🇵🇹',
    Switzerland: '🇨🇭', New_Zealand: '🇳🇿', Argentina: '🇦🇷',
};

export function getCountryFlag(country) {
    if (!country) return '🏁';
    return FLAGS[country] || FLAGS[country.replace(/ /g, '_')] || '🏁';
}

const NATIONALITIES = {
    british: 'British', dutch: 'Dutch', monegasque: 'Monégasque',
    australian: 'Australian', spanish: 'Spanish', german: 'German',
    french: 'French', mexican: 'Mexican', canadian: 'Canadian',
    finnish: 'Finnish', japanese: 'Japanese', thai: 'Thai',
    danish: 'Danish', american: 'American', italian: 'Italian',
    austrian: 'Austrian', new_zealander: 'New Zealander',
    argentinian: 'Argentinian', chinese: 'Chinese',
};

export function getNationality(nat) {
    if (!nat) return '';
    return NATIONALITIES[nat.toLowerCase()] || nat;
}
