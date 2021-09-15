import React from 'react';

import Button from '../../components/Button';

import useSignIn from '../../hooks/useSignIn';

import {
  Container,
  SubTitle,
  Title,
  GoogleIcon,
  BackgroundImage,
  Wrapper,
} from './styles';

const SignIn: React.FC = () => {
  const { signInWithGoogle } = useSignIn();

  return (
    <Wrapper>
      <BackgroundImage />
      <Container>
        <Title>Boas-vindas</Title>
        <SubTitle>
          Centralize suas informações e simplifique sua rotina com Smart Mirror
        </SubTitle>
        <Button onPress={signInWithGoogle} left={<GoogleIcon />}>
          Entrar com Google
        </Button>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
