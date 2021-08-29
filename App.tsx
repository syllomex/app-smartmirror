import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AuthProvider from "./src/contexts/auth";

const AppComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Hello world!</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
