import React from 'react';
import {
  FaUserPlus,
  FaLocationArrow,
  FaMapMarkedAlt,
  FaWindowClose,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerTraceImg from '../../assets/images/logo-trace-pack-dark.png';

import logoImg from '../../assets/logo-trace-pack.png';
import { useAuth } from '../../hooks/auth';

import { Container, Content, Mapa, AnimationContainer } from './styles';

// const mapIcon = Leaflet.icon({
//   iconUrl: mapMarkerImg,
// });

const mapIconTrace = Leaflet.icon({
  iconUrl: mapMarkerTraceImg,
  iconSize: [289, 150], // size of the icon
  iconAnchor: [0, 150],
  popupAnchor: [144, -130], // point from which the popup should open relative to the iconAnchor
});

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} width="150px" alt="Trace Pack" />

          <Link to="/signup">
            <FaUserPlus />
            Cadastrar Usuário
          </Link>

          <Link to="/locations/list">
            <FaLocationArrow />
            Listar Localizações
          </Link>

          <Link to="/localization/create">
            <FaMapMarkedAlt />
            Cadastrar Localização
          </Link>

          {/* <Link to="/locations/list">
            <FaLocationArrow />
            Listar Polígonos
          </Link>

          <Link to="/localization/polygon/create">
            <FaMapMarkedAlt />
            Cadastrar Polígonos
          </Link> */}

          <Link to="/" onClick={signOut}>
            <FaWindowClose />
            Sair
          </Link>
        </AnimationContainer>
      </Content>
      <Mapa>
        <Map
          center={[-23.2875493, -51.228804]}
          zoom={17}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          <Marker icon={mapIconTrace} position={[-23.2875296, -51.2286645]}>
            <Popup>
              Av. Tiradentes, 6275 <br /> Jardim Rosicler <br /> Londrina - PR,
              86072-000 <br /> +55 43 99120-1148
            </Popup>
          </Marker>
        </Map>
      </Mapa>
    </Container>
  );
};

export default Dashboard;
