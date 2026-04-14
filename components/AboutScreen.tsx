import { Stack } from 'expo-router'; // 1. Importar o Stack
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 2. Adicionar esta configuração aqui: */}
      <Stack.Screen 
        options={{ 
          title: 'About', // Escreve aqui o que quiseres que apareça
          headerTintColor: '#12263A', // Cor da seta e do título
        }} 
      />

      <Text style={styles.title}>Sobre o PlanetarySystemGO</Text>
      <Text style={styles.text}>
        O PlanetarySystemGO é uma aplicação móvel educativa desenvolvida com React Native (Expo) que utiliza geolocalização e realidade aumentada para explorar o sistema solar. A aplicação integra uma experiência web interativa via WebView, onde os dados de GPS do utilizador são injetados para posicionar astros e planetas em relação à sua localização real. O projeto combina uma interface nativa intuitiva com tecnologias web para criar uma simulação astronómica imersiva e dinâmica.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#12263A' },
  text: { fontSize: 16, lineHeight: 22, color: '#333' },
});





