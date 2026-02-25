import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import CountdownTimer from '../components/CountdownTimer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSchedule, useDriverStandings, useConstructorStandings, useLastRaceResult } from '../hooks/useF1Data';
import { getCountryFlag, getTeamColor } from '../utils/helpers';
import './Home.css';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const stagger = {
    show: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
    const { data: schedule, loading: schedLoading } = useSchedule();
    const { data: driverStandings, loading: dsLoading } = useDriverStandings();
    const { data: ctorStandings, loading: csLoading } = useConstructorStandings();
    const { data: lastRace, loading: lrLoading } = useLastRaceResult();

    const nextRace = useMemo(() => {
        if (!schedule || schedule.length === 0) return null;
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10); // 'YYYY-MM-DD'
        // Find first race whose date is >= today
        return schedule.find(r => r.date && r.date >= todayStr) || null;
    }, [schedule]);


    const top3Drivers = driverStandings?.slice(0, 3) || [];
    const top3Ctors = ctorStandings?.slice(0, 3) || [];
    const podium = lastRace?.Results?.slice(0, 3) || [];

    return (
        <motion.div className="page home-page" initial="hidden" animate="show" variants={stagger}>
            {/* ── Hero / Countdown ──────────────────────────────── */}
            <motion.section variants={fadeUp} className="hero-section">
                <div className="hero-grid">
                    <div className="hero-left">
                        <p className="hero-eyebrow">🏎 FORMULA ONE TRACKER</p>
                        <h1 className="hero-title">
                            Your Personal<br /><span className="hero-accent">Pit Wall</span>
                        </h1>
                        <p className="hero-sub">Real-time standings, race results, and driver insights — all in one place.</p>
                    </div>
                    <div className="hero-right">
                        {schedLoading ? <LoadingSpinner /> : nextRace ? (
                            <div className="countdown-card card">
                                <div className="race-meta-row">
                                    <span className="flag">{getCountryFlag(nextRace.Circuit?.Location?.country)}</span>
                                    <span className="race-meta-circuit">{nextRace.Circuit?.circuitName}</span>
                                </div>
                                <CountdownTimer
                                    targetDate={`${nextRace.date}T${nextRace.time || '15:00:00'}Z`}
                                    raceName={nextRace.raceName}
                                />
                                <p className="race-meta-date">
                                    📅 {format(parseISO(nextRace.date), 'MMMM d, yyyy')} · Round {nextRace.round}
                                </p>
                            </div>
                        ) : (
                            <div className="card" style={{ textAlign: 'center', color: 'var(--f1-text-dim)' }}>
                                Season complete 🏁
                            </div>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* ── Last Race Podium ─────────────────────────────── */}
            {!lrLoading && lastRace && (
                <motion.section variants={fadeUp} className="section">
                    <h2 className="section-title">🏆 Last Race Podium — {lastRace.raceName}</h2>
                    <div className="red-line" />
                    <div className="podium-grid">
                        {podium.map((r, i) => (
                            <div key={r.Driver.driverId} className={`podium-card card pos-card-${i + 1}`}>
                                <span className="podium-pos">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                                <p className="podium-driver">
                                    {getCountryFlag(r.Driver.nationality)} {r.Driver.givenName} {r.Driver.familyName}
                                </p>
                                <p className="podium-team" style={{ color: getTeamColor(r.Constructor.constructorId) }}>
                                    {r.Constructor.name}
                                </p>
                                <p className="podium-time">{r.Time?.time || r.status}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* ── Driver Standings Snapshot ────────────────────── */}
            <motion.section variants={fadeUp} className="section">
                <h2 className="section-title">👤 Driver Championship — Top 10</h2>
                <div className="red-line" />
                {dsLoading ? <LoadingSpinner /> : (
                    <div className="standings-list">
                        {driverStandings?.slice(0, 10).map((s, i) => (
                            <div key={s.Driver.driverId} className="standing-row">
                                <span className={`standing-pos ${i < 3 ? `pos-${i + 1}` : ''}`}>{s.position}</span>
                                <span className="standing-name">
                                    {getCountryFlag(s.Driver.nationality)} {s.Driver.givenName} {s.Driver.familyName}
                                </span>
                                <span className="standing-team" style={{ color: getTeamColor(s.Constructors?.[0]?.constructorId) }}>
                                    {s.Constructors?.[0]?.name}
                                </span>
                                <div className="standing-bar-wrap">
                                    <div
                                        className="standing-bar"
                                        style={{
                                            width: `${Math.round((parseInt(s.points) / parseInt(driverStandings[0].points)) * 100)}%`,
                                            background: getTeamColor(s.Constructors?.[0]?.constructorId),
                                        }}
                                    />
                                </div>
                                <span className="standing-pts">{s.points} pts</span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.section>

            {/* ── Constructor Standings Snapshot ──────────────── */}
            <motion.section variants={fadeUp} className="section">
                <h2 className="section-title">🏭 Constructor Championship — Top 10</h2>
                <div className="red-line" />
                {csLoading ? <LoadingSpinner /> : (
                    <div className="standings-list">
                        {ctorStandings?.slice(0, 10).map((s, i) => (
                            <div key={s.Constructor.constructorId} className="standing-row">
                                <span className={`standing-pos ${i < 3 ? `pos-${i + 1}` : ''}`}>{s.position}</span>
                                <span className="standing-name" style={{ color: getTeamColor(s.Constructor.constructorId) }}>
                                    {s.Constructor.name}
                                </span>
                                <div className="standing-bar-wrap">
                                    <div
                                        className="standing-bar"
                                        style={{
                                            width: `${Math.round((parseInt(s.points) / parseInt(ctorStandings[0].points)) * 100)}%`,
                                            background: getTeamColor(s.Constructor.constructorId),
                                        }}
                                    />
                                </div>
                                <span className="standing-pts">{s.points} pts</span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.section>
        </motion.div>
    );
}
