import Icon from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { RefObject } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface GameMenuProps {
  setMenuVisible: (visible: boolean) => void;
  webViewRef: RefObject<WebView | null>;
}

export default function GameMenu({ setMenuVisible, webViewRef }: GameMenuProps) {
  const router = useRouter();

  // --- LÓGICA DE INÍCIO DO JOGO ---
  const startGame = (factor: number) => {
    console.log(`Iniciando jogo com fator X${factor}`);
    
    if (webViewRef.current) {
      // Definimos o URL base das páginas de jogo
      const baseUrl = 'https://projeto-final-lei-ipt.github.io/PlanetarySystemV2/webview/Pages/';
      // Determinamos o ficheiro correto com base no fator
      const page = `GamePageX${factor}.html`;
      
      // Injetamos o comando para mudar de página diretamente no browser da WebView
      const script = `window.location.href = '${baseUrl}${page}'; true;`;
      webViewRef.current.injectJavaScript(script);
    }

    // Pequeno atraso para garantir que o comando é enviado antes de esconder o menu
    setTimeout(() => {
      setMenuVisible(false);
    }, 200);
  };

  const handleInstrucoes = () => {
    console.log('Navegando para: Instruções');
    router.push('/instructions');
  };

  const handleAbout = () => {
    console.log('Navegando para: About');
    router.push('/about');
  };

  return (
    <SafeAreaView style={styles.menuOverlay}>
      <View style={styles.centerContainer}>
        {/* Logo da App */}
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.buttonContainer}>
          {/* Botão Jogo Rápido (X1) */}
          <TouchableOpacity style={styles.menuButton} onPress={() => startGame(1)}>
            <Icon name="flash-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>Jogo Rápido (Real)</Text>
          </TouchableOpacity>

          {/* SECÇÃO DE DISTÂNCIAS */}
          <Text style={styles.sectionTitle}>Escolher Escala de Distância:</Text>
          <View style={styles.distanceGrid}>
            {[1, 2, 3, 5].map((f) => (
              <TouchableOpacity 
                key={f} 
                style={styles.distButton} 
                onPress={() => startGame(f)}
              >
                <Text style={styles.distButtonText}>X{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botão Instruções */}
          <TouchableOpacity style={styles.menuButton} onPress={handleInstrucoes}>
            <Icon name="information-circle-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>Instruções</Text>
          </TouchableOpacity>

          {/* Botão About */}
          <TouchableOpacity style={styles.menuButton} onPress={handleAbout}>
            <Icon name="help-circle-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Versão no Rodapé Removida */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '85%',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#12263A',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  distanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  distButton: {
    backgroundColor: '#12263A',
    width: '22%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  distButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12263A',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
  },
});
