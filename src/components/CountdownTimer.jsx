import { useState, useEffect } from 'react';
import './CountdownTimer.css';

function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

export default function CountdownTimer({ targetDate, raceName }) {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (!targetDate) return;
        const target = new Date(targetDate);
        if (isNaN(target.getTime())) return;

        const calc = () => {
            const diffMs = target.getTime() - Date.now();
            if (diffMs <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            const totalSec = Math.floor(diffMs / 1000);
            const days = Math.floor(totalSec / 86400);
            const hours = Math.floor((totalSec % 86400) / 3600);
            const minutes = Math.floor((totalSec % 3600) / 60);
            const seconds = totalSec % 60;
            setTimeLeft({ days, hours, minutes, seconds });
        };
        calc();
        const id = setInterval(calc, 1000);
        return () => clearInterval(id);
    }, [targetDate]);

    if (!timeLeft) return null;

    return (
        <div className="countdown-wrap">
            <p className="countdown-label">NEXT RACE</p>
            <p className="countdown-race">{raceName}</p>
            <div className="countdown-grid">
                {[
                    { val: timeLeft.days, unit: 'Days' },
                    { val: timeLeft.hours, unit: 'Hours' },
                    { val: timeLeft.minutes, unit: 'Minutes' },
                    { val: timeLeft.seconds, unit: 'Seconds' },
                ].map(({ val, unit }, i) => (
                    <div key={unit} className="countdown-block">
                        <span className="countdown-num">{pad(val)}</span>
                        <span className="countdown-unit">{unit}</span>
                        {i < 3 && <span className="countdown-colon">:</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
