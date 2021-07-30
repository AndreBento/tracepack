import React, { useCallback, useRef, useState } from 'react';
import {
  FaLocationArrow,
  FaMapMarkedAlt,
  FaArrowLeft,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import { Link, useHistory } from 'react-router-dom';

import { Map, TileLayer, Marker } from 'react-leaflet';
import Leaflet, { LeafletMouseEvent } from 'leaflet';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import mapMarkerImg from '../../assets/images/map-marker.svg';
import Input from '../../components/Input';

import { Container, Content, Mapa, AnimationContainer } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Button from '../../components/Button';

interface LocalizationFormData {
  name: string;
  about: string;
  latitude: number;
  longitude: number;
}

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [50, 50], // size of the icon
  iconAnchor: [25, 50],
  popupAnchor: [0, -45],
});

const CreateLocalization: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [name, setName] = useState('');
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const handleSubmit = useCallback(
    async (data: LocalizationFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          latitude: Yup.number().required('Latitude obrigatório'),
          longitude: Yup.number().required('Longitude obrigatório'),
          about: Yup.string().required('Descrição obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/locations', data);

        history.push('/locations/list');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Suas localizações na Trace Pack!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de Localização</h1>

            <Input
              name="name"
              value={name}
              onChange={event => setName(event.target.value)}
              icon={FaMapMarkerAlt}
              placeholder="Nome"
            />
            <Input
              name="about"
              icon={FaLocationArrow}
              placeholder="Descrição"
            />
            <Input
              name="latitude"
              value={position.latitude}
              icon={FaMapMarkedAlt}
              placeholder="Latitude"
            />
            <Input
              name="longitude"
              value={position.longitude}
              icon={FaMapMarkedAlt}
              placeholder="Longitude"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FaArrowLeft />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
      <Mapa>
        <Map
          center={[-23.2875493, -51.228804]}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
          onClick={handleMapClick}
        >
          <TileLayer
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          {position.latitude !== 0 && (
            <Marker
              interactive={false}
              icon={mapIcon}
              position={[position.latitude, position.longitude]}
            />
          )}
        </Map>
      </Mapa>
    </Container>
  );
};

export default CreateLocalization;
