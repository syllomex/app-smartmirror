import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';

import Input from '../../components/Input';
import Loading from '../../components/Loading';
import useAuth from '../../contexts/auth/useAuth';
import { api } from '../../services/api';

import { Asterisk, BackgroundImage, Container, Label, Wrapper } from './styles';

const MirrorCode: React.FC = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<any>();

  const handleSubmit = useCallback(async (_code: number) => {
    if (!user) return;

    setLoading(true);

    try {
      const code = _code.toString().padStart(6, '0');
      const params = { code, googleId: user.id };
      await api.post('mirrors/connect', params);

      setLoading(false);
      navigate('MirrorConnected');
    } catch (error) {
      alert(error.response?.data?.message);
      // console.log(error.response?.data);

      setLoading(false);
    }
  }, []);

  const handleChangeCode = useCallback((text: string) => {
    const code = +text;

    if (Number.isNaN(code)) return;
    if (text.length < 6) return;

    handleSubmit(code);
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
    </Wrapper>
  );
};

export default MirrorCode;
