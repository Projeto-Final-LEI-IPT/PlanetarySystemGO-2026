import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function InstructionsScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Configura o título na barra superior e a cor da seta de voltar */}
      <Stack.Screen 
        options={{ 
          title: 'Instruções', 
          headerTintColor: '#12263A',
          headerShown: true 
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.mainTitle}>Como Jogar</ThemedText>
        
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.stepTitle}>1. Permissões</ThemedText>
          <ThemedText style={styles.textContent}>
            Certifica-te de que aceitaste as permissões de Câmara e GPS. Elas são fundamentais para localizares os planetas no mundo real.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.stepTitle}>2. Exploração</ThemedText>
          <ThemedText style={styles.textContent}>
            Move o teu telemóvel ao teu redor. O sistema utiliza a tua localização real para projetar o sistema solar através do ecrã.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.stepTitle}>3. Interação</ThemedText>
          <ThemedText style={styles.textContent}>
            Podes alternar entre o "Jogo Rápido" para uma experiência imediata ou "Escolher Distâncias" para ajustar a escala do sistema planetário.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.stepTitle}>4. Voltar ao Menu</ThemedText>
          <ThemedText style={styles.textContent}>
            Se estiveres dentro do simulador e quiseres voltar, procura o botão de saída no ecrã ou usa a navegação do sistema.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
  },
  mainTitle: {
    marginBottom: 25,
    color: '#12263A',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(18, 38, 58, 0.05)',
    borderRadius: 10,
  },
  stepTitle: {
    fontSize: 18,
    color: '#12263A',
    marginBottom: 5,
  },
  textContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});