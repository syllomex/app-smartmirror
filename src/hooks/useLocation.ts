import { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

import useAuth from '../contexts/auth/useAuth';
import { api } from '../services/api';

export default function useLocation() {
  const { user } = useAuth();

  const [location, setLocation] = useState<Location.LocationObject>();

  const get = useCallback(async () => {
    return new Promise<boolean>((resolve) => {
      (async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== 'granted') return resolve(false);

          const result = await Location.getCurrentPositionAsync();
          setLocation(result);

          resolve(true);
        } catch (err) {
          setTimeout(async () => {
            try {
              const result = await Location.getCurrentPositionAsync();
              setLocation(result);
              resolve(true);
            } catch (error) {
              Alert.alert(
                'Não foi possível obter a localização',
                'Certifique-se de que o serviço de localização está ativo e tente novamentee.'
              );
              resolve(false);
            }
          }, 500);
        }
      })();
    });
  }, []);

  useEffect(() => {
    if (!user?.id || !location) return;

    api.post('geolocation', {
      googleId: user.id,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }, [user?.id, location]);

  return { get };
}
