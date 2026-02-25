import { getTeamLogo, getTeamAbbr } from '../utils/teamAssets';
import { getTeamColor } from '../utils/helpers';
import './TeamLogo.css';

export default function TeamLogo({ constructorId, name, size = 'md' }) {
    const logoUrl = getTeamLogo(constructorId);
    const color = getTeamColor(constructorId);
    const abbr = getTeamAbbr(constructorId);

    if (logoUrl) {
        return (
            <img
                src={logoUrl}
                alt={name || constructorId}
                className={`team-logo team-logo-${size}`}
                onError={(e) => {
                    // On load failure, replace with text badge fallback
                    e.target.style.display = 'none';
                    e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
                }}
            />
        );
    }
    // CSS badge fallback
    return (
        <span className={`team-badge team-logo-${size}`} style={{ background: color }}>
            {abbr}
        </span>
    );
}
