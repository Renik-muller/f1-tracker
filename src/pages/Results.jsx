import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import SeasonSelector from '../components/SeasonSelector';
import TeamLogo from '../components/TeamLogo';
import { useSchedule, useRaceResult } from '../hooks/useF1Data';
import { STANDINGS_YEAR } from '../api/f1Api';
import { getCountryFlag, getTeamColor } from '../utils/helpers';
import './Results.css';

// ── Custom F1 Car dot ─────────────────────────────────────────────
const CarDot = ({ cx, cy, fill }) => {
    if (!cx || !cy) return null;
    return (
        <g transform={`translate(${cx},${cy})`}>
            {/* body */}
            <ellipse rx="7" ry="4" fill={fill} stroke="#fff" strokeWidth="0.8" />
            {/* cockpit bump */}
            <ellipse cx="1" cy="-1.5" rx="3" ry="2" fill={fill} stroke="#fff" strokeWidth="0.6" />
            {/* front wing */}
            <rect x="-10" y="2" width="5" height="1.5" rx="0.5" fill={fill} stroke="#fff" strokeWidth="0.5" />
            {/* rear wing */}
            <rect x="6" y="2" width="5" height="1.5" rx="0.5" fill={fill} stroke="#fff" strokeWidth="0.5" />
        </g>
    );
};

// ── Position change chart ─────────────────────────────────────────
function GridFinishChart({ results }) {
    if (!results?.length) return null;

    const top10 = results.slice(0, 10);
    // Build properly-keyed data array for Recharts
    const chartData = [
        { pos: 'Grid', ...Object.fromEntries(top10.map(r => [r.Driver.code || r.Driver.familyName.slice(0, 3).toUpperCase(), parseInt(r.grid) || 20])) },
        { pos: 'Finish', ...Object.fromEntries(top10.map(r => [r.Driver.code || r.Driver.familyName.slice(0, 3).toUpperCase(), parseInt(r.position) || 20])) },
    ];

    const drivers = top10.map(r => ({
        key: r.Driver.code || r.Driver.familyName.slice(0, 3).toUpperCase(),
        color: getTeamColor(r.Constructor.constructorId),
    }));

    const maxPos = Math.max(...top10.map(r => Math.max(parseInt(r.grid) || 1, parseInt(r.position) || 1)), 10);

    return (
        <div className="chart-wrap card">
            <h3 className="chart-title">Grid → Finish Position (Top 10)</h3>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData} margin={{ top: 16, right: 24, bottom: 5, left: 0 }}>
                    <XAxis dataKey="pos" tick={{ fill: '#888', fontSize: 13, fontWeight: 600 }} />
                    <YAxis
                        reversed
                        domain={[1, maxPos]}
                        tick={{ fill: '#888', fontSize: 11 }}
                        label={{ value: 'Position', angle: -90, position: 'insideLeft', fill: '#888', fontSize: 11 }}
                    />
                    <Tooltip
                        contentStyle={{ background: 'var(--f1-card)', border: '1px solid var(--f1-border)', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }}
                    />
                    <Legend
                        wrapperStyle={{ fontSize: '0.7rem', paddingTop: '0.5rem' }}
                        formatter={(val, entry) => <span style={{ color: entry.color }}>{val}</span>}
                    />
                    {drivers.map(d => (
                        <Line
                            key={d.key}
                            type="monotone"
                            dataKey={d.key}
                            stroke={d.color}
                            strokeWidth={2}
                            dot={<CarDot fill={d.color} />}
                            activeDot={{ r: 6, fill: d.color, stroke: '#fff', strokeWidth: 1 }}
                            connectNulls
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// ── Main Results page ─────────────────────────────────────────────
export default function Results() {
    const [season, setSeason] = useState(2025);
    // Use full schedule — all 2025 races are in the past, 2026 none yet
    const { data: schedule, loading: sLoading } = useSchedule(season);
    const [selectedRound, setSelectedRound] = useState('');

    // Filter to completed races only
    const completedRaces = (schedule || []).filter(r => {
        const todayStr = new Date().toISOString().slice(0, 10);
        return r.date < todayStr;
    });

    const effectiveRound = selectedRound || completedRaces[completedRaces.length - 1]?.round || '';
    const { data: raceResult, loading: rLoading } = useRaceResult(season, effectiveRound);

    const handleSeasonChange = (y) => {
        setSeason(y);
        setSelectedRound('');
    };

    const isEmpty2026 = season === 2026 && !sLoading && !completedRaces.length;

    return (
        <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="page-header-row">
                <h1 className="page-title">📊 Race <span className="accent">Results</span></h1>
                <SeasonSelector year={season} onChange={handleSeasonChange} />
            </div>
            <div className="red-line" />

            {isEmpty2026 ? (
                <div className="error-box">🏁 No race results yet for 2026. Check back after Round 1!</div>
            ) : sLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="results-controls">
                        <label htmlFor="race-select" className="select-label">Select Race</label>
                        <select
                            id="race-select"
                            className="f1-select"
                            value={effectiveRound}
                            onChange={e => setSelectedRound(e.target.value)}
                        >
                            {completedRaces.map(r => (
                                <option key={r.round} value={r.round}>
                                    Rd {r.round.padStart(2, '0')} — {r.raceName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {rLoading ? <LoadingSpinner text="Loading race data..." /> : raceResult ? (
                        <>
                            <div className="race-info-bar">
                                <span className="flag">{getCountryFlag(raceResult.Circuit?.Location?.country)}</span>
                                <div>
                                    <h2 className="race-result-title">{raceResult.raceName}</h2>
                                    <p className="race-result-meta">{raceResult.Circuit?.circuitName} · {raceResult.date}</p>
                                </div>
                            </div>

                            <GridFinishChart results={raceResult.Results} />

                            <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                                <table className="f1-table">
                                    <thead>
                                        <tr>
                                            <th>Pos</th><th>Driver</th><th>Team</th><th>Grid</th><th>Laps</th><th>Time / Status</th><th>Pts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(raceResult.Results || []).map((r, i) => (
                                            <tr key={r.Driver.driverId}>
                                                <td><span className={i < 3 ? `pos-${i + 1}` : ''}>{r.position}</span></td>
                                                <td className="result-driver">
                                                    {getCountryFlag(r.Driver.nationality)} {r.Driver.givenName} {r.Driver.familyName}
                                                    {r.FastestLap?.rank === '1' && <span className="fl-badge">⚡ FL</span>}
                                                </td>
                                                <td>
                                                    <div className="team-cell">
                                                        <TeamLogo constructorId={r.Constructor.constructorId} name={r.Constructor.name} size="sm" />
                                                        <span style={{ color: getTeamColor(r.Constructor.constructorId) }}>{r.Constructor.name}</span>
                                                    </div>
                                                </td>
                                                <td className="grid-pos">{r.grid}</td>
                                                <td>{r.laps}</td>
                                                <td className="result-time">{r.Time?.time || r.status}</td>
                                                <td><strong>{r.points}</strong></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="error-box">No results available for this race yet.</div>
                    )}
                </>
            )}
        </motion.div>
    );
}
