import React, { useEffect, useState } from 'react';
import { FaLocationArrow, FaMapMarkedAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import api from '../../services/api';
import mapMarkerImg from '../../assets/images/map-marker.svg';

import logoImg from '../../assets/logo-trace-pack.png';

import { Container, Content, Mapa, AnimationContainer } from './styles';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [50, 50], // size of the icon
  iconAnchor: [25, 50],
  popupAnchor: [0, -45],
});

interface Locations {
  id: string;
  name: string;
  about: string;
  latitude: number;
  longitude: number;
}

const ListLocations: React.FC = () => {
  const [locations, setLocations] = useState<Locations[]>([]);

  useEffect(() => {
    api.get('locations').then(response => {
      setLocations(response.data);
    });
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} width="150px" alt="Trace Pack" />

          <Link to="/locations/list">
            <FaLocationArrow />
            Listar Localizações
          </Link>

          <Link to="/localization/create">
            <FaMapMarkedAlt />
            Cadastrar Localização
          </Link>

          <Link to="/">
            <FaArrowLeft />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
      <Mapa>
        <Map
          center={[-23.2875493, -51.228804]}
          zoom={16}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          {locations.map(localization => {
            return (
              <Marker
                key={localization.id}
                icon={mapIcon}
                position={[localization.latitude, localization.longitude]}
              >
                <Popup closeButton={false} ninWidth={240} maxWidth={240}>
                  {localization.name}
                  <Link to="/locations/list"> Ver Mais</Link>
                </Popup>
              </Marker>
            );
          })}
        </Map>
      </Mapa>
    </Container>
  );
};

export default ListLocations;
