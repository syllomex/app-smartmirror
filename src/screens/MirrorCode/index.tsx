import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

import { colors } from '../../assets/colors';

import Input from '../../components/Input';
import Loading from '../../components/Loading';

import useAuth from '../../contexts/auth/useAuth';
import useSignIn from '../../hooks/useSignIn';
import { useSocket } from '../../hooks/useSocket';

import {
  Asterisk,
  BackgroundImage,
  Container,
  Label,
  LogoutContainer,
  LogoutText,
  Wrapper,
} from './styles';

const MirrorCode: React.FC = () => {
  const { user, setCode, setMirror } = useAuth();
  const { signOut } = useSignIn();
  const { io } = useSocket();

  const [_code, _setCode] = useState('');

  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<any>();

  useEffect(() => {
    if (_code.length < 6) return;

    io.on(`from-server.connect:${_code}`, (args) => {
      setLoading(false);

      if (!args) {
        Alert.alert(
          'Espelho não encontrado',
          'Verifique o código e tente novamente.'
        );

        return;
      }

      setMirror(args);
      setCode(_code);
    });

    return () => {
      io.off(`from-server.connect:${_code}`);
    };
  }, [io, setMirror, _code, navigate, setCode]);

  const handleSubmit = useCallback(
    async (__code: number) => {
      if (!user) return;

      const codeStr = __code.toString().padStart(6, '0');
      const params = { code: codeStr, googleId: user.id };

      setLoading(true);
      io.emit('from-app.connect', params);
      _setCode(codeStr);
    },
    [io, user]
  );

  const handleChangeCode = useCallback(
    (text: string) => {
      const isNum = /^\d+$/.test(text);
      if (!isNum && text.length !== 0) return;

      _setCode(text);

      if (text.length < 6) return;

      handleSubmit(+text);
    },
    [handleSubmit]
  );

  return (
    <Wrapper>
      <Loading loading={loading} />

      <BackgroundImage />

      <Container>
        <Asterisk />
        <Label>Insira o código do Smart Mirror</Label>
        <Input
          textAlign="center"
          maxLength={6}
          keyboardType="decimal-pad"
          onChangeText={handleChangeCode}
          value={_code}
        />
      </Container>

      <LogoutContainer onPress={signOut}>
        <LogoutText>Sair</LogoutText>
        <Ionicons name="exit-outline" size={24} color={colors.text_light_1} />
      </LogoutContainer>
    </Wrapper>
  );
};

export default MirrorCode;
