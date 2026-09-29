import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Fix Leaflet marker icon issue in React build
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function LeafletMap() {
  const { storeLocation, t } = useApp();

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 relative z-0">
      <MapContainer
        center={[storeLocation.lat, storeLocation.lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[storeLocation.lat, storeLocation.lng]}>
          <Popup className="custom-leaflet-popup">
            <div className="p-2 space-y-2 text-gray-900">
              <div className="flex items-center gap-2 font-black text-indigo-600">
                <MapPin className="w-5 h-5" />
                <span>{storeLocation.name}</span>
              </div>
              <p className="text-xs text-gray-600 font-semibold">{storeLocation.address}</p>
              <div className="text-xs space-y-1 pt-1 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.working_hours}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{storeLocation.phone}</span>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${storeLocation.lat},${storeLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full py-1.5 text-center bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition"
              >
                {t.get_directions} ↗
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
