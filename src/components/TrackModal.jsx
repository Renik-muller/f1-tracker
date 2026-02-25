import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { getTrackLayout, CIRCUIT_INFO } from '../utils/trackLayouts';
import { getCountryFlag } from '../utils/helpers';
import './TrackModal.css';

export default function TrackModal({ race, onClose }) {
    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    if (!race) return null;
    const circuitId = race.Circuit?.circuitId;
    const layoutUrl = getTrackLayout(circuitId);
    const info = CIRCUIT_INFO[circuitId];
    const flag = getCountryFlag(race.Circuit?.Location?.country);

    // Session schedule from race object
    const sessions = [
        race.FirstPractice && { label: 'Practice 1', date: race.FirstPractice.date, time: race.FirstPractice.time },
        race.SecondPractice && { label: 'Practice 2', date: race.SecondPractice.date, time: race.SecondPractice.time },
        race.ThirdPractice && { label: 'Practice 3', date: race.ThirdPractice.date, time: race.ThirdPractice.time },
        race.Sprint && { label: 'Sprint', date: race.Sprint.date, time: race.Sprint.time },
        race.SprintShootout && { label: 'Sprint Qual', date: race.SprintShootout.date, time: race.SprintShootout.time },
        race.Qualifying && { label: 'Qualifying', date: race.Qualifying.date, time: race.Qualifying.time },
        { label: 'Grand Prix', date: race.date, time: race.time },
    ].filter(Boolean);

    return (
        <AnimatePresence>
            <motion.div
                className="track-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="track-modal"
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="track-modal-header">
                        <div>
                            <p className="track-modal-round">ROUND {race.round}</p>
                            <h2 className="track-modal-title">
                                {flag} {race.raceName}
                            </h2>
                            <p className="track-modal-loc">
                                {race.Circuit?.circuitName} · {race.Circuit?.Location?.locality}, {race.Circuit?.Location?.country}
                            </p>
                        </div>
                        <button className="track-modal-close" onClick={onClose} aria-label="Close">✕</button>
                    </div>

                    <div className="track-modal-body">
                        {/* Track Layout */}
                        <div className="track-layout-wrap">
                            {layoutUrl ? (
                                <img
                                    src={layoutUrl}
                                    alt={`${race.Circuit?.circuitName} layout`}
                                    className="track-layout-img"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div className="track-layout-placeholder">
                                    <span>🗺</span>
                                    <p>Layout not available</p>
                                </div>
                            )}
                        </div>

                        {/* Circuit Stats */}
                        {info && (
                            <div className="circuit-stats">
                                <div className="stat-chip"><span className="chip-val">{info.laps}</span><span className="chip-lbl">Laps</span></div>
                                <div className="stat-chip"><span className="chip-val">{info.length}</span><span className="chip-lbl">Circuit Length</span></div>
                                <div className="stat-chip"><span className="chip-val">{info.turns}</span><span className="chip-lbl">Turns</span></div>
                            </div>
                        )}

                        {/* Weekend Schedule */}
                        <div className="track-sessions">
                            <h3 className="sessions-title">WEEKEND SCHEDULE</h3>
                            <div className="sessions-list">
                                {sessions.map((s) => (
                                    <div key={s.label} className={`session-row ${s.label === 'Grand Prix' ? 'session-gp' : ''}`}>
                                        <span className="session-label">{s.label}</span>
                                        <span className="session-date">
                                            {s.date ? format(parseISO(s.date), 'EEE, MMM d') : '—'}
                                            {s.time ? ` · ${s.time.slice(0, 5)} UTC` : ''}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
