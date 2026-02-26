// Manual corrections applied on top of the 2025 API standings
// Keys must match the driverId returned by the Ergast/Jolpica API (short format)

export const DRIVER_TEAM_OVERRIDES_2025 = {
    lawson: { constructorId: 'rb', name: 'Racing Bulls' },
    hadjar: { constructorId: 'rb', name: 'Racing Bulls' },
    tsunoda: { constructorId: 'red_bull', name: 'Red Bull Racing' },
};

// Drivers to hide entirely from the 2025 view
export const DRIVER_EXCLUDE_2025 = new Set(['doohan']);

// Nationality overrides
export const DRIVER_NATIONALITY_OVERRIDES = {
    colapinto: 'argentinian',
};

export function applyDriverOverrides2025(standings = []) {
    return standings
        .filter(s => !DRIVER_EXCLUDE_2025.has(s.Driver.driverId))
        .map(s => {
            const teamOverride = DRIVER_TEAM_OVERRIDES_2025[s.Driver.driverId];
            const natOverride = DRIVER_NATIONALITY_OVERRIDES[s.Driver.driverId];
            if (!teamOverride && !natOverride) return s;
            return {
                ...s,
                Driver: natOverride
                    ? { ...s.Driver, nationality: natOverride }
                    : s.Driver,
                Constructors: teamOverride
                    ? [{ constructorId: teamOverride.constructorId, name: teamOverride.name }]
                    : s.Constructors,
            };
        });
}
