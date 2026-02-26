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
    cadillac: '#FFFFFF',
    audi: '#111111',
    alphatauri: '#5E8FAA',
    alfa: '#C92D4B',
};

export function getTeamColor(constructorId) {
    if (!constructorId) return '#E10600';
    const key = constructorId.toLowerCase().replace(/[^a-z_]/g, '_');
    return TEAM_COLORS[key] || '#888888';
}

// ── Country Flags (emoji) — case-insensitive lookup ───────────────
const FLAGS = {
    // nationality adjectives (from Ergast API)
    british: '🇬🇧', dutch: '🇳🇱', monegasque: '🇲🇨',
    australian: '🇦🇺', spanish: '🇪🇸', german: '🇩🇪',
    french: '🇫🇷', mexican: '🇲🇽', canadian: '🇨🇦',
    finnish: '🇫🇮', japanese: '🇯🇵', chinese: '🇨🇳',
    danish: '🇩🇰', thai: '🇹🇭', american: '🇺🇸',
    italian: '🇮🇹', austrian: '🇦🇹', swiss: '🇨🇭',
    'new zealander': '🇳🇿', new_zealander: '🇳🇿', argentinian: '🇦🇷',
    bahraini: '🇧🇭', brazilian: '🇧🇷',
    // Country names (circuit locations)
    uk: '🇬🇧', netherlands: '🇳🇱', monaco: '🇲🇨',
    australia: '🇦🇺', spain: '🇪🇸', germany: '🇩🇪',
    france: '🇫🇷', mexico: '🇲🇽', canada: '🇨🇦',
    bahrain: '🇧🇭', japan: '🇯🇵', china: '🇨🇳',
    italy: '🇮🇹', austria: '🇦🇹', hungary: '🇭🇺',
    belgium: '🇧🇪', singapore: '🇸🇬', usa: '🇺🇸',
    'united states': '🇺🇸', brazil: '🇧🇷', uae: '🇦🇪',
    'abu dhabi': '🇦🇪', 'saudi arabia': '🇸🇦', saudi: '🇸🇦',
    azerbaijan: '🇦🇿', qatar: '🇶🇦', portugal: '🇵🇹',
};

export function getCountryFlag(country) {
    if (!country) return '🏁';
    const key = country.toLowerCase().trim();
    return FLAGS[key] || FLAGS[key.replace(/ /g, '_')] || '🏁';
}

const NATIONALITIES = {
    british: 'British', dutch: 'Dutch', monegasque: 'Monégasque',
    australian: 'Australian', spanish: 'Spanish', german: 'German',
    french: 'French', mexican: 'Mexican', canadian: 'Canadian',
    finnish: 'Finnish', japanese: 'Japanese', thai: 'Thai',
    danish: 'Danish', american: 'American', italian: 'Italian',
    austrian: 'Austrian', 'new zealander': 'New Zealander',
    argentinian: 'Argentinian', chinese: 'Chinese', brazilian: 'Brazilian',
};

export function getNationality(nat) {
    if (!nat) return '';
    return NATIONALITIES[nat.toLowerCase()] || nat;
}
