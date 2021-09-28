import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import { colors } from '../../assets/colors';

import Input from '../../components/Input';
import Loading from '../../components/Loading';

import useAuth from '../../contexts/auth/useAuth';
import useSignIn from '../../hooks/useSignIn';

import { api } from '../../services/api';

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
  const { user, googleToken, code, setCode, setMirror } = useAuth();
  const { signOut } = useSignIn();

  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<any>();

  useEffect(() => {
    if (!user || !googleToken || !code) return;

    navigate('MirrorConnected');
  }, [user, googleToken, code]);

  const handleSubmit = useCallback(async (_code: number) => {
    if (!user) return;

    setLoading(true);

    try {
      const codeStr = _code.toString().padStart(6, '0');
      const params = { code: codeStr, googleId: user.id };
      const result = await api.post('mirrors/connect', params);

      setLoading(false);
      setCode(codeStr);
      setMirror(result.data.data);
    } catch (error) {
      // console.log(error.message);
      // console.log(error.response?.data);

      setLoading(false);
    }
  }, []);

  const handleChangeCode = useCallback((text: string) => {
    const codeNum = +text;

    if (Number.isNaN(code)) return;
    if (text.length < 6) return;

    handleSubmit(codeNum);
  }, []);

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
