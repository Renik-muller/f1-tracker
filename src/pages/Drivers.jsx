import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import SeasonSelector from '../components/SeasonSelector';
import DriverPhoto from '../components/DriverPhoto';
import TeamLogo from '../components/TeamLogo';
import { useDriverStandings } from '../hooks/useF1Data';
import { DRIVERS_2026 } from '../utils/drivers2026';
import { getCountryFlag, getTeamColor, getNationality } from '../utils/helpers';
import './Drivers.css';

const DRIVER_NUMBERS = {
    max_verstappen: 1, lando_norris: 4, charles_leclerc: 16,
    oscar_piastri: 81, carlos_sainz: 55, george_russell: 63,
    lewis_hamilton: 44, kimi_antonelli: 12, fernando_alonso: 14,
    lance_stroll: 18, pierre_gasly: 10, jack_doohan: 7,
    esteban_ocon: 31, nico_hulkenberg: 27, oliver_bearman: 87,
    isack_hadjar: 6, yuki_tsunoda: 22, liam_lawson: 30,
    alexander_albon: 23, franco_colapinto: 43,
    gabriel_bortoleto: 5, colton_herta: 28, marcus_armstrong: 45,
};

// Map DRIVERS_2026 structure into the same shape as Ergast standing items
function to2026Standing(d, i) {
    return {
        position: String(i + 1),
        points: '0',
        wins: '0',
        Driver: {
            driverId: d.driverId,
            givenName: d.givenName,
            familyName: d.familyName,
            dateOfBirth: d.dateOfBirth,
            nationality: d.nationality,
            permanentNumber: d.permanentNumber,
            url: d.url,
        },
        Constructors: d.Constructors,
    };
}

export default function Drivers() {
    const [season, setSeason] = useState(2025);
    const { data: standings2025, loading, error } = useDriverStandings(2025);
    const [selected, setSelected] = useState(null);

    const handleSeasonChange = (y) => {
        setSeason(y);
        setSelected(null);
    };

    // Use static 2026 roster if 2026 selected
    const rawDrivers = season === 2026
        ? DRIVERS_2026.map(to2026Standing)
        : standings2025;

    if (loading && season === 2025) return <div className="page"><LoadingSpinner /></div>;
    if (error && season === 2025) return <div className="page"><div className="error-box">Failed to load drivers.</div></div>;

    const drivers = rawDrivers || [];

    return (
        <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="page-header-row">
                <h1 className="page-title">🧑‍✈️ <span className="accent">Driver</span> Profiles</h1>
                <SeasonSelector year={season} onChange={handleSeasonChange} />
            </div>
            {season === 2026 && (
                <p style={{ fontSize: '0.8rem', color: 'var(--f1-text-dim)', marginBottom: '1rem' }}>
                    🏁 Showing confirmed 2026 lineup — points will update once the season begins.
                </p>
            )}
            <div className="red-line" />

            <div className="drivers-grid">
                {drivers.map((s, i) => {
                    const teamColor = getTeamColor(s.Constructors?.[0]?.constructorId);
                    const ctorId = s.Constructors?.[0]?.constructorId;
                    const drvNum = DRIVER_NUMBERS[s.Driver.driverId] || s.Driver.permanentNumber;
                    const isOpen = selected === i;

                    return (
                        <motion.div
                            key={s.Driver.driverId}
                            className={`driver-card card ${isOpen ? 'selected' : ''}`}
                            onClick={() => setSelected(isOpen ? null : i)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            style={{ '--team-color': teamColor }}
                        >
                            <div className="driver-top-bar" style={{ background: teamColor }} />

                            <div className="driver-card-inner">
                                <div className="driver-photo-wrap">
                                    <DriverPhoto
                                        driverId={s.Driver.driverId}
                                        givenName={s.Driver.givenName}
                                        familyName={s.Driver.familyName}
                                        constructorId={ctorId}
                                        size="md"
                                    />
                                    <div className="driver-num-badge">#{drvNum}</div>
                                </div>

                                <div className="driver-info">
                                    <div className="driver-flag-name">
                                        <span className="flag">{getCountryFlag(s.Driver.nationality)}</span>
                                        <div>
                                            <p className="driver-first">{s.Driver.givenName}</p>
                                            <p className="driver-last">{s.Driver.familyName}</p>
                                        </div>
                                    </div>
                                    <div className="driver-team-row">
                                        <TeamLogo constructorId={ctorId} name={s.Constructors?.[0]?.name} size="sm" />
                                        <span className="driver-team" style={{ color: teamColor }}>
                                            {s.Constructors?.[0]?.name}
                                        </span>
                                    </div>
                                    {season === 2025
                                        ? <p className="driver-pos">P{s.position} · {s.points} pts</p>
                                        : <p className="driver-pos">2026 Confirmed</p>
                                    }
                                </div>
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="driver-expand"
                                    >
                                        <div className="driver-stats">
                                            {season === 2025 && (
                                                <div className="stat-item"><span className="stat-val">{s.wins}</span><span className="stat-lbl">Wins</span></div>
                                            )}
                                            {season === 2025 && (
                                                <div className="stat-item"><span className="stat-val">{s.points}</span><span className="stat-lbl">Points</span></div>
                                            )}
                                            <div className="stat-item">
                                                <span className="stat-val">{s.Driver.dateOfBirth?.slice(0, 4)}</span>
                                                <span className="stat-lbl">Born</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="stat-val">#{drvNum}</span>
                                                <span className="stat-lbl">Number</span>
                                            </div>
                                        </div>
                                        <p className="driver-nat">
                                            {getCountryFlag(s.Driver.nationality)} {getNationality(s.Driver.nationality)}
                                        </p>
                                        {s.Driver.url && (
                                            <a href={s.Driver.url} target="_blank" rel="noopener noreferrer" className="driver-wiki"
                                                onClick={e => e.stopPropagation()}>
                                                Wikipedia →
                                            </a>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
