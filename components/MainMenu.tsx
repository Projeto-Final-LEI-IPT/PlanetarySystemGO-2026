import Icon from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'; // Importação necessária para navegar
import React, { RefObject } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface GameMenuProps {
  setMenuVisible: (visible: boolean) => void;
  webViewRef: RefObject<WebView | null>;
}

export default function GameMenu({ setMenuVisible, webViewRef }: GameMenuProps) {
  const router = useRouter(); // Inicializa o navegador

  // --- LÓGICA INTERNA ---
  const handleJogoRapido = () => {
    console.log('Clicou em: Jogo Rápido');
    setMenuVisible(false);
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript('window.startGame(1); true;');
    }
  };

  const handleJogarOffline = () => {
    console.log('Clicou em: Jogar Offline');
    setMenuVisible(false);
    if (webViewRef.current) {
      // Exemplo: Envia um comando específico para o modo offline
      webViewRef.current.injectJavaScript('window.startOfflineMode(); true;');
    }
  };

  const handleInstrucoes = () => {
    console.log('Navegando para: Instruções');
    router.push('/instructions');
  };

  const handleEscolherDistancias = () => {
    console.log('Clicou em: Escolher distancias');
    setMenuVisible(false);
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript('window.startGame(2); true;');
    }
  };

  const handleAbout = () => {
    console.log('Navegando para: About');
    //setMenuVisible(false); // Esconde o menu para mostrar a nova página
    router.push('/about'); // Navega para app/about.tsx
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
          {/* Botão Jogo Rápido */}
          <TouchableOpacity style={styles.menuButton} onPress={handleJogoRapido}>
            <Icon name="flash-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>Jogo Rápido</Text>
          </TouchableOpacity>

          {/* NOVO BOTÃO: JOGAR OFFLINE */}
          <TouchableOpacity style={styles.menuButton} onPress={handleJogarOffline}>
            <Icon name="cloud-offline-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>Jogar Offline</Text>
          </TouchableOpacity>

          {/* Botão Instruções */}
          <TouchableOpacity style={styles.menuButton} onPress={handleInstrucoes}>
            <Icon name="information-circle-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>Instruções</Text>
          </TouchableOpacity>

          {/* Botão Escolher Distâncias */}
          <TouchableOpacity style={styles.menuButton} onPress={handleEscolherDistancias}>
            <Icon name="location-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>Escolher distâncias</Text>
          </TouchableOpacity>

          {/* Botão About */}
          <TouchableOpacity style={styles.menuButton} onPress={handleAbout}>
            <Icon name="help-circle-outline" size={22} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuButtonText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Versão no Rodapé */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>v1.0.2</Text>
      </View>
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
    backgroundColor: 'white', // Fundo Branco solicitado
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
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12263A', // Azul marinho ligeiramente mais claro
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3, // Sombra leve para Android
    shadowColor: '#000', // Sombra leve para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 12,
  },
  menuButtonText: {
    color: '#FFFFFF', // Texto Branco para contraste
    fontSize: 18,
    fontWeight: '500',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#000000', // Texto preto para leitura no fundo branco
    fontSize: 13,
    opacity: 0.5,
  },
});