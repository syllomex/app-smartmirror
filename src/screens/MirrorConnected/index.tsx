import React from 'react';
import Button from '../../components/Button';
import useSignIn from '../../hooks/useSignIn';

import { Container, SubTitle, Title, BackgroundImage, Wrapper } from './styles';

const MirrorConnected: React.FC = () => {
  const { signOut } = useSignIn();

  return (
    <Wrapper>
      <BackgroundImage />
      <Container>
        <Title>Espelho conectado!</Title>
        <SubTitle>Tela em construção!</SubTitle>

        <Button onPress={signOut}>Sair</Button>
      </Container>
    </Wrapper>
  );
};

export default MirrorConnected;
