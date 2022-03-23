import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { useState, useEffect } from 'react';

import L from 'leaflet';
import SetViewOnClick from '../hooks/useMap';

// https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


function Map(props){

    var coords = props.coords;
    var markerString = props.q;

    return(
        <MapContainer center={coords} zoom={7}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>
            {markerString}
          </Popup>
        </Marker>
        <SetViewOnClick coords={coords} />
      </MapContainer>
    )

}

export default Map;