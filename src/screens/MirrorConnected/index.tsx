import React from 'react';
import { View } from 'react-native';

import Button from '../../components/Button';

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

        <Button onPress={clearCode}>Desconectar espelho</Button>
        <View style={{ marginBottom: 16 }} />
        <Button onPress={signOut}>Sair</Button>
      </Container>
    </Wrapper>
  );
};

export default MirrorConnected;
