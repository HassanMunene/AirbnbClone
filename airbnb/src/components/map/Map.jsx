'use client';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
});

const Map = ({ center }) => {
    return (
        <MapContainer
            center={center || [51, -0.09]}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className='h-[35vh] rounded-lg'
        >
            <TileLayer 
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; OpenStreetMap contributers'
            />
            {center && (
                <Marker position={center}/>
            )}
        </MapContainer>
    )
}

export default Map;