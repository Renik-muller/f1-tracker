import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import SeasonSelector from '../components/SeasonSelector';
import TeamLogo from '../components/TeamLogo';
import { useDriverStandings, useConstructorStandings } from '../hooks/useF1Data';
import { getCountryFlag, getTeamColor } from '../utils/helpers';
import { getTeamAbbr } from '../utils/teamAssets';
import './Standings.css';

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="chart-tooltip">
            <p className="tooltip-label">{payload[0].payload.name}</p>
            <p className="tooltip-val">{payload[0].value} pts</p>
        </div>
    );
};

// Custom bar label showing team abbreviation inside each bar
const TeamLabel = ({ x, y, width, height, value, abbr, color }) => {
    if (!abbr || height < 20) return null;
    return (
        <text
            x={x + width / 2}
            y={y + height / 2 + 5}
            fill="#fff"
            textAnchor="middle"
            fontSize={9}
            fontFamily="Orbitron, sans-serif"
            fontWeight="700"
            opacity={0.85}
        >
            {abbr}
        </text>
    );
};

export default function Standings() {
    const [tab, setTab] = useState('drivers');
    const [season, setSeason] = useState(2025);

    const { data: drivers, loading: dLoading } = useDriverStandings(season);
    const { data: ctors, loading: cLoading } = useConstructorStandings(season);

    const driverChartData = (drivers || []).slice(0, 10).map(s => ({
        name: `${s.Driver.givenName[0]}. ${s.Driver.familyName}`,
        pts: parseInt(s.points) || 0,
        color: getTeamColor(s.Constructors?.[0]?.constructorId),
        abbr: getTeamAbbr(s.Constructors?.[0]?.constructorId),
    }));

    const ctorChartData = (ctors || []).slice(0, 10).map(s => ({
        name: s.Constructor.name,
        pts: parseInt(s.points) || 0,
        color: getTeamColor(s.Constructor.constructorId),
        abbr: getTeamAbbr(s.Constructor.constructorId),
    }));

    const chartData = tab === 'drivers' ? driverChartData : ctorChartData;
    const loading = tab === 'drivers' ? dLoading : cLoading;
    const isEmpty = !loading && (tab === 'drivers' ? !drivers?.length : !ctors?.length);

    return (
        <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="page-header-row">
                <h1 className="page-title">🏆 <span className="accent">Championship</span> Standings</h1>
                <SeasonSelector year={season} onChange={y => setSeason(y)} />
            </div>
            <div className="red-line" />

            <div className="tab-group">
                <button className={`tab-btn ${tab === 'drivers' ? 'active' : ''}`} onClick={() => setTab('drivers')}>Drivers</button>
                <button className={`tab-btn ${tab === 'ctors' ? 'active' : ''}`} onClick={() => setTab('ctors')}>Constructors</button>
            </div>

            {loading ? <LoadingSpinner /> : isEmpty ? (
                <div className="error-box">
                    {season === 2026
                        ? '🏁 The 2026 season hasn\'t started yet — standings will appear after Round 1.'
                        : 'No standings data available.'}
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div key={`${tab}-${season}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>

                        {/* ── Bar Chart with team abbr labels ── */}
                        <div className="chart-container card">
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: '#888', fontSize: 10, fontFamily: 'Inter' }}
                                        angle={-40}
                                        textAnchor="end"
                                        interval={0}
                                    />
                                    <YAxis tick={{ fill: '#888', fontSize: 11 }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(225,6,0,0.05)' }} />
                                    <Bar dataKey="pts" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                        <LabelList
                                            content={({ x, y, width, height, index }) => (
                                                <TeamLabel
                                                    x={x} y={y} width={width} height={height}
                                                    abbr={chartData[index]?.abbr}
                                                    color={chartData[index]?.color}
                                                />
                                            )}
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* ── Table ── */}
                        <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                            <table className="f1-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {tab === 'drivers' ? (
                                            <><th>Driver</th><th>Nat</th><th>Team</th><th>Wins</th><th>Points</th></>
                                        ) : (
                                            <><th>Team</th><th>Logo</th><th>Wins</th><th>Points</th></>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tab === 'drivers'
                                        ? (drivers || []).map((s, i) => (
                                            <tr key={s.Driver.driverId}>
                                                <td><span className={i < 3 ? `pos-${i + 1}` : ''}>{s.position}</span></td>
                                                <td className="driver-name-td">{s.Driver.givenName} {s.Driver.familyName}</td>
                                                <td className="flag-cell">
                                                    <span title={s.Driver.nationality}>
                                                        {getCountryFlag(s.Driver.nationality)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="team-cell">
                                                        <TeamLogo constructorId={s.Constructors?.[0]?.constructorId} name={s.Constructors?.[0]?.name} size="sm" />
                                                        <span style={{ color: getTeamColor(s.Constructors?.[0]?.constructorId) }}>
                                                            {s.Constructors?.[0]?.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{s.wins}</td>
                                                <td><strong className="pts-cell">{s.points}</strong></td>
                                            </tr>
                                        ))
                                        : (ctors || []).map((s, i) => (
                                            <tr key={s.Constructor.constructorId}>
                                                <td><span className={i < 3 ? `pos-${i + 1}` : ''}>{s.position}</span></td>
                                                <td style={{ color: getTeamColor(s.Constructor.constructorId), fontWeight: 600 }}>
                                                    {s.Constructor.name}
                                                </td>
                                                <td><TeamLogo constructorId={s.Constructor.constructorId} name={s.Constructor.name} size="sm" /></td>
                                                <td>{s.wins}</td>
                                                <td><strong className="pts-cell">{s.points}</strong></td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </motion.div>
    );
}
