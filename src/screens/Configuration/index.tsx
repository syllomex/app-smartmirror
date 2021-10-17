import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import Button from '../../components/Button';
import Title from '../../components/Title';

import useAuth from '../../contexts/auth/useAuth';

import useSignIn from '../../hooks/useSignIn';
import { useSocket } from '../../hooks/useSocket';

import {
  Avatar,
  Container,
  ContentContainer,
  ContentContainerBlock,
  Email,
  Logout,
  Name,
} from './styles';

const Configuration: React.FC = () => {
  const { io } = useSocket();
  const { user, clearCode, mirror } = useAuth();
  const { signOut } = useSignIn();

  console.log('mirror', mirror);

  const disconnect = useCallback(() => {
    // console.log(mirror);
    if (!mirror?.hash)
      return console.warn('Could not get mirror hash on disconnect.');

    io.emit(`from-app.disconnect`, { hash: mirror?.hash });
    clearCode();
  }, [clearCode, io, mirror]);

  return (
    <Container>
      <Title>Configurações</Title>

      <ContentContainer>
        <ContentContainerBlock>
          <Avatar source={{ uri: user?.photoUrl }} />

          <Name>
            {user?.givenName} {user?.familyName}
          </Name>

          <Email>{user?.email}</Email>
        </ContentContainerBlock>
        <ContentContainerBlock style={{ justifyContent: 'center' }}>
          <Button
            theme="outline"
            style={{ paddingHorizontal: 16 }}
            onPress={disconnect}
          >
            Desconectar espelho
          </Button>
          <TouchableOpacity onPress={signOut}>
            <Logout>Sair da conta</Logout>
          </TouchableOpacity>
        </ContentContainerBlock>
      </ContentContainer>
    </Container>
  );
};

export default Configuration;
