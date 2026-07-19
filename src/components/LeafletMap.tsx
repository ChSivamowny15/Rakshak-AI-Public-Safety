import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  detail?: string;
  intensity: number; // 0-100
}

const colorFor = (i: number) => (i > 80 ? '#f43f5e' : i > 60 ? '#f59e0b' : '#22d3ee');

function FitBounds({ points }: { points: MapPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

export function LeafletMap({
  points,
  height = 420,
  heatmap = false,
}: {
  points: MapPoint[];
  height?: number;
  heatmap?: boolean;
}) {
  return (
    <div style={{ height }} className="w-full overflow-hidden rounded-2xl border border-white/10">
      <MapContainer center={[22.5, 80]} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {points.map((p, i) => (
          <CircleMarker
            key={i}
            center={[p.lat, p.lng]}
            radius={6 + p.intensity / 14}
            pathOptions={{ color: colorFor(p.intensity), fillColor: colorFor(p.intensity), fillOpacity: 0.5 }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">{p.label}</p>
                {p.detail && <p className="text-slate-600">{p.detail}</p>}
                <p className="mt-1 font-mono text-xs">Intensity {p.intensity}%</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
        {heatmap &&
          points.map((p, i) => (
            <CircleMarker
              key={`h-${i}`}
              center={[p.lat, p.lng]}
              radius={26 + p.intensity / 3}
              pathOptions={{
                color: colorFor(p.intensity),
                fillColor: colorFor(p.intensity),
                fillOpacity: 0.12,
                weight: 0,
              }}
            />
          ))}
      </MapContainer>
    </div>
  );
}
