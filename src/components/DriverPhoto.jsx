import { useState } from 'react';
import { getDriverPhoto, getDriverInitials } from '../utils/driverPhotos';
import { getTeamColor } from '../utils/helpers';
import './DriverPhoto.css';

export default function DriverPhoto({ driverId, givenName, familyName, constructorId, size = 'md' }) {
    const [imgErr, setImgErr] = useState(false);
    const photoUrl = getDriverPhoto(driverId);
    const initials = getDriverInitials(givenName, familyName);
    const color = getTeamColor(constructorId);

    if (photoUrl && !imgErr) {
        return (
            <img
                src={photoUrl}
                alt={`${givenName} ${familyName}`}
                className={`driver-photo driver-photo-${size}`}
                onError={() => setImgErr(true)}
                style={{ borderColor: color }}
            />
        );
    }

    return (
        <div
            className={`driver-initials driver-photo-${size}`}
            style={{ background: `linear-gradient(135deg, ${color}44, ${color}22)`, borderColor: color }}
        >
            {initials}
        </div>
    );
}
