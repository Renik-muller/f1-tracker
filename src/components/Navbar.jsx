import { NavLink } from 'react-router-dom';
import { SCHEDULE_YEAR } from '../api/f1Api';
import './Navbar.css';


const F1_LOGO = '🏎';

const links = [
    { to: '/', label: 'Home' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/standings', label: 'Standings' },
    { to: '/results', label: 'Results' },
    { to: '/drivers', label: 'Drivers' },
];

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <span className="navbar-brand">
                    {F1_LOGO}
                    <span className="brand-text">F1<span className="brand-accent">TRACK</span></span>
                </span>
                <nav className="navbar-links">
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <div className="navbar-year">
                    <span>{SCHEDULE_YEAR} <span className="season-label">SEASON</span></span>
                </div>
            </div>
            <div className="navbar-red-bar" />
        </header>
    );
}
