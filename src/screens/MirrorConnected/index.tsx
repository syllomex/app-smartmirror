import React from 'react';
import { View } from 'react-native';

import Button from '../../components/Button';
import Location from '../../components/Location';

import useAuth from '../../contexts/auth/useAuth';

import useSignIn from '../../hooks/useSignIn';

import { Container, SubTitle, Title, BackgroundImage, Wrapper } from './styles';

const MirrorConnected: React.FC = () => {
  const { signOut } = useSignIn();
  const { clearCode } = useAuth();

  return (
    <Wrapper>
      <BackgroundImage />
      <Container>
        <Title>Espelho conectado!</Title>
        <SubTitle>Tela em construção!</SubTitle>

        <View style={{ marginBottom: 16 }} />
        <Location />

        <View style={{ marginBottom: 16 }} />
        <Button onPress={clearCode}>Desconectar espelho</Button>

        <View style={{ marginBottom: 16 }} />
        <Button onPress={signOut}>Sair</Button>
      </Container>
    </Wrapper>
  );
};

export default MirrorConnected;
