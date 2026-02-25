import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import TrackModal from '../components/TrackModal';
import { useSchedule } from '../hooks/useF1Data';
import { SCHEDULE_YEAR } from '../api/f1Api';
import { getCountryFlag } from '../utils/helpers';
import './Schedule.css';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.4 } }),
};

export default function Schedule() {
    const { data: schedule, loading, error } = useSchedule();
    const [selectedRace, setSelectedRace] = useState(null);

    const enriched = useMemo(() => {
        if (!schedule) return [];
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);
        let foundNext = false;
        return schedule.map(race => {
            let status;
            if (race.date < todayStr) {
                status = 'completed';
            } else if (!foundNext) {
                status = 'next';
                foundNext = true;
            } else {
                status = 'upcoming';
            }
            return { ...race, status };
        });
    }, [schedule]);

    if (loading) return <div className="page"><LoadingSpinner /></div>;
    if (error) return <div className="page"><div className="error-box">Failed to load schedule.</div></div>;

    return (
        <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <h1 className="page-title">📅 {SCHEDULE_YEAR} <span className="accent">Season Calendar</span></h1>
            <p className="schedule-hint">Click any race card to see the track layout &amp; weekend schedule</p>
            <div className="red-line" />

            <div className="schedule-grid">
                {enriched.map((race, i) => (
                    <motion.div
                        key={race.round}
                        custom={i}
                        initial="hidden"
                        animate="show"
                        variants={fadeUp}
                        className={`race-card card status-${race.status}`}
                        onClick={() => setSelectedRace(race)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedRace(race)}
                    >
                        {race.status === 'next' && <div className="next-glow" />}
                        <div className="race-card-top">
                            <span className="race-round">RD {race.round}</span>
                            <span className={`badge badge-${race.status}`}>
                                {race.status === 'completed' ? '✔ Completed' :
                                    race.status === 'next' ? '⚡ Next Race' : '🕐 Upcoming'}
                            </span>
                        </div>
                        <div className="race-flag">
                            {getCountryFlag(race.Circuit?.Location?.country)}
                        </div>
                        <h3 className="race-name">{race.raceName}</h3>
                        <p className="race-circuit">{race.Circuit?.circuitName}</p>
                        <p className="race-location">
                            {race.Circuit?.Location?.locality}, {race.Circuit?.Location?.country}
                        </p>
                        <div className="race-footer">
                            <p className="race-date">{format(parseISO(race.date), 'MMMM d, yyyy')}</p>
                            <span className="race-view-btn">View Track →</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {selectedRace && (
                <TrackModal race={selectedRace} onClose={() => setSelectedRace(null)} />
            )}
        </motion.div>
    );
}
