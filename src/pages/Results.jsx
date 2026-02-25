import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import SeasonSelector from '../components/SeasonSelector';
import TeamLogo from '../components/TeamLogo';
import { useCompletedRaces, useRaceResult } from '../hooks/useF1Data';
import { getCountryFlag, getTeamColor } from '../utils/helpers';
import './Results.css';

function GridFinishChart({ results }) {
    if (!results?.length) return null;
    const drivers = results.slice(0, 10).map(r => ({
        name: r.Driver.code || r.Driver.familyName.slice(0, 3).toUpperCase(),
        grid: parseInt(r.grid) || 0,
        finish: parseInt(r.position) || 0,
        color: getTeamColor(r.Constructor.constructorId),
    }));
    return (
        <div className="chart-wrap card">
            <h3 className="chart-title">Grid → Finish (Top 10)</h3>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={[{ x: 'Grid' }, { x: 'Finish' }]} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <XAxis dataKey="x" tick={{ fill: '#888', fontSize: 12 }} />
                    <YAxis reversed tick={{ fill: '#888', fontSize: 11 }} domain={[1, 10]} />
                    <Tooltip contentStyle={{ background: 'var(--f1-card)', border: '1px solid var(--f1-border)', borderRadius: '8px', color: '#fff' }} />
                    <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                    {drivers.map(d => (
                        <Line key={d.name} type="monotone" dataKey={d.name} stroke={d.color} strokeWidth={2} dot={{ r: 4 }}
                            data={[{ x: 'Grid', [d.name]: d.grid }, { x: 'Finish', [d.name]: d.finish }]} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function Results() {
    const [season, setSeason] = useState(2025);
    const { data: completed, loading: cLoading } = useCompletedRaces(season);
    const [selectedRound, setSelectedRound] = useState('');

    const effectiveRound = selectedRound || completed?.[completed.length - 1]?.round || '';
    const { data: raceResult, loading: rLoading } = useRaceResult(season, effectiveRound);

    const handleSeasonChange = (y) => {
        setSeason(y);
        setSelectedRound('');
    };

    const isEmpty2026 = season === 2026 && !cLoading && !completed?.length;

    return (
        <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="page-header-row">
                <h1 className="page-title">📊 Race <span className="accent">Results</span></h1>
                <SeasonSelector year={season} onChange={handleSeasonChange} />
            </div>
            <div className="red-line" />

            {isEmpty2026 ? (
                <div className="error-box">
                    🏁 No race results yet for the {season} season. Check back after Round 1!
                </div>
            ) : cLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="results-controls">
                        <label htmlFor="race-select" className="select-label">Select Race</label>
                        <select id="race-select" className="f1-select" value={effectiveRound} onChange={e => setSelectedRound(e.target.value)}>
                            {(completed || []).map(r => (
                                <option key={r.round} value={r.round}>Rd {r.round} — {r.raceName}</option>
                            ))}
                        </select>
                    </div>

                    {rLoading ? <LoadingSpinner /> : raceResult ? (
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
                        <div className="error-box">No results available yet.</div>
                    )}
                </>
            )}
        </motion.div>
    );
}
