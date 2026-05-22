import { Stack, useRouter } from 'expo-router'; // 1. Importar o Stack e useRouter
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
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

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.replace('/')}
      >
        <Text style={styles.backButtonText}>Voltar ao Menu Inicial</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#12263A' },
  text: { fontSize: 16, lineHeight: 22, color: '#333', marginBottom: 20 },
  backButton: {
    backgroundColor: '#12263A',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});





