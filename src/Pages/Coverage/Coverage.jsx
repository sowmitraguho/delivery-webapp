import React, { useEffect, useState } from 'react';
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Manually import marker images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon issue in Leaflet with Webpack
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Coverage = () => {
    const center = [23.8103, 90.4125]; // Central point
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/warehouses.json').then(res => {
            console.log(res);
            return res.json();
        }).then(data => {
            console.log(data);
            setData(data);
        }).catch(error => {
            console.error("Error loading JSON:", error);
        });
    }, [])
    const locations = data.map((item) => ({
        id: `${item.district}-${item.city}`,
        name: `${item.city}, ${item.district}`,
        position: [item.latitude, item.longitude],
        covered_area: item.covered_area,
        flowchart: item.flowchart,
    }));

    return (
        <div className='p-20'>
            <h2 className="text-3xl font-semibold">We are available in 64 districts</h2>
            <MapContainer center={center} zoom={7} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc) => (
                    <Marker key={loc.id} position={loc.position}>
                        <Popup>
                            <strong>{loc.name}</strong><br />
                            Covered Areas: {loc.covered_area.join(", ")}<br />
                            <a href={loc.flowchart} target="_blank" rel="noopener noreferrer">View Flowchart</a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Coverage;