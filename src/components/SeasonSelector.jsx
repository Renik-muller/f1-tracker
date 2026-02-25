import './SeasonSelector.css';

export default function SeasonSelector({ year, onChange }) {
    const seasons = [2025, 2026];
    return (
        <div className="season-selector">
            <span className="season-label-txt">SEASON</span>
            <div className="season-pills">
                {seasons.map(y => (
                    <button
                        key={y}
                        className={`season-pill ${year === y ? 'active' : ''}`}
                        onClick={() => onChange(y)}
                    >
                        {y}
                    </button>
                ))}
            </div>
        </div>
    );
}
