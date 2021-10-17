import React, { useEffect, useState, useCallback } from 'react';
import { Text } from 'react-native';

import * as GeoLocation from 'expo-location';
import { LocationObject } from 'expo-location';

import Button from '../Button';
import useAuth from '../../contexts/auth/useAuth';
import { api } from '../../services/api';

// import { Container } from './styles';

const Location: React.FC = () => {
  const { user } = useAuth();

  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();

  const handleGetLocation = useCallback(async () => {
    const { status } = await GeoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const coords = await GeoLocation.getCurrentPositionAsync({});
    setLocation(coords);
  }, []);

  useEffect(() => {
    if (!user?.id || !location) return;

    api
      .post('geolocation', {
        googleId: user.id,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      .then((res) => console.log(res.data));
  }, [user?.id, location]);

  console.log(errorMsg);

  if (location)
    return (
      <Text style={{ color: 'white' }}>
        Coordenadas: {location.coords.latitude} {location.coords.longitude}
      </Text>
    );

  return <Button onPress={handleGetLocation}>Obter localização</Button>;
};

export default Location;
