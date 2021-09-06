import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AuthProvider from './src/contexts/auth';
import useSignIn from './src/hooks/useSignIn';

const AppComponent: React.FC = () => {
  const { signInWithGoogle, user } = useSignIn();

  const code = useRef<string>('');

  const [connected, setConnected] = useState();

  const handleSendCode = async () => {
    try {
      if (!user?.id || code.current.length !== 6) return;

      const response = await axios.post(
        'http://192.168.0.104:8000/mirrors/connect',
        { code: code.current, googleId: user.id }
      );

      console.log(response.data);
      setConnected(response.data);
    } catch (error) {
      console.log(error.response?.data);
      setConnected(false);
    }
  };

  console.log(connected);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Hello {user?.givenName || 'world'}!</Text>

      {!user && (
        <TouchableOpacity onPress={signInWithGoogle}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      )}

      {user && connected === undefined && (
        <>
          <TextInput
            placeholder="Digite o código do espelho"
            onChangeText={(text) => {
              code.current = text;
            }}
            textAlign="center"
            keyboardType="decimal-pad"
            maxLength={6}
          />

          <TouchableOpacity onPress={handleSendCode}>
            <Text>Enviar</Text>
          </TouchableOpacity>
        </>
      )}

      {connected === false && (
        <>
          <Text>Não foi possível conectar ao espelho.</Text>
          <TouchableOpacity onPress={() => setConnected(undefined)}>
            <Text>Tentar novamente</Text>
          </TouchableOpacity>
        </>
      )}

      {!!connected && <Text>{JSON.stringify(connected)}</Text>}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
