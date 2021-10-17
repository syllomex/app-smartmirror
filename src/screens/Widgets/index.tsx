import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Loading from '../../components/Loading';
import Switch from '../../components/Switch';

import Title from '../../components/Title';
import useAuth from '../../contexts/auth/useAuth';
import useLocation from '../../hooks/useLocation';
import { useSocket } from '../../hooks/useSocket';
import { api } from '../../services/api';

import { Container, Description, WidgetContainer, WidgetLabel } from './styles';

const Widgets: React.FC = () => {
  const { mirror } = useAuth();
  const { io } = useSocket();

  const [widgets, setWidgets] = useState<string[]>();

  const { get: getLocation } = useLocation();

  const handleToggleWidget = useCallback(
    async (widget: { name: string; status: boolean }) => {
      if (!mirror?.hash) {
        // eslint-disable-next-line no-console
        console.warn('Could not get mirror hash on toggle widget.');
        return true;
      }

      const emit = () => {
        io.emit('from-app.toggle-widget', {
          hash: mirror?.hash,
          widget,
        });
      };

      if (widget.name === 'weather' && widget.status) {
        const response = await new Promise((resolve) => {
          Alert.alert(
            'Ativar localização',
            'Para obter informações do clima é necessário que você forneça sua localização pelo menos uma vez.',
            [
              { text: 'Cancelar', onPress: () => resolve(false) },
              {
                text: 'Fornecer localização',
                onPress: async () => {
                  const result = await getLocation();
                  if (!result) return resolve(false);

                  emit();
                  resolve(true);
                },
              },
            ],
            { cancelable: true, onDismiss: () => resolve(false) }
          );
        });

        const prevent = !response;
        return prevent;
      }

      emit();
      return false;
    },
    [io, mirror, getLocation]
  );

  useEffect(() => {
    if (!mirror?.hash) return;

    (async () => {
      const result = await api.get('/mirrors/widgets', {
        params: { hash: mirror.hash },
      });

      if (result.data.data) setWidgets(result.data.data);
    })();
  }, [mirror?.hash]);

  if (!widgets) return <Loading loading />;

  return (
    <Container>
      <Title>Widgets</Title>

      <Description>
        Ative os widgets para apresentá-lo no Smart Mirror
      </Description>

      <WidgetContainer>
        <WidgetLabel>Clima</WidgetLabel>
        <Switch
          onValueChange={(value) =>
            handleToggleWidget({ name: 'weather', status: value })
          }
          defaultValue={widgets?.includes('weather')}
        />
      </WidgetContainer>
      <WidgetContainer>
        <WidgetLabel>Gmail</WidgetLabel>
        <Switch
          onValueChange={(value) =>
            handleToggleWidget({ name: 'gmail', status: value })
          }
          defaultValue={widgets?.includes('gmail')}
        />
      </WidgetContainer>
      <WidgetContainer>
        <WidgetLabel>Agenda</WidgetLabel>
        <Switch
          onValueChange={(value) =>
            handleToggleWidget({ name: 'agenda', status: value })
          }
          defaultValue={widgets?.includes('agenda')}
        />
      </WidgetContainer>
    </Container>
  );
};

export default Widgets;
