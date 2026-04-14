import React, { RefObject } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Ajustado para o pacote nativo do Expo que já tens instalado
import Icon from '@expo/vector-icons/Ionicons';
import { WebView } from 'react-native-webview';


// Recebe as ferramentas do index.tsx para tratar de tudo internamente
interface GameMenuProps {
  setMenuVisible: (visible: boolean) => void;
  webViewRef: RefObject<WebView | null>; // Adicionado o | null aqui!
}

export default function GameMenu({ setMenuVisible, webViewRef }: GameMenuProps) {

  // --- LÓGICA INTERNA DO MENU ---
  const handleJogoRapido = () => {
    console.log('Clicou em: Jogo Rápido');
    setMenuVisible(false); // Esconde o menu
    if (webViewRef.current) {
      // Dá ordem à WebView para arrancar o jogo
      webViewRef.current.injectJavaScript('window.startGame(1); true;');
    }
  };

  const handleInstrucoes = () => {
    console.log('Clicou em: Instruções');
    // Aqui podes decidir se abre um modal de instruções ou se vai para a web
  };

  const handleEscolherDistancias = () => {
    console.log('Clicou em: Escolher distancias');
    setMenuVisible(false); // Esconde o menu
    if (webViewRef.current) {
      // Dá ordem à WebView para arrancar com fator X2 (exemplo)
      webViewRef.current.injectJavaScript('window.startGame(2); true;');
    }
  };

  // --- O TEU DESIGN INTACTO ---
  return (
    <SafeAreaView style={styles.menuOverlay}>
      <View style={styles.centerContainer}>

        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.menuButton} onPress={handleJogoRapido}>
            <Icon name="flash-outline" size={22} color="#4FC3F7" style={styles.icon} />
            <Text style={styles.menuButtonText}>Jogo Rápido</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={handleInstrucoes}>
            <Icon name="information-circle-outline" size={22} color="#4FC3F7" style={styles.icon} />
            <Text style={styles.menuButtonText}>Instruções</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={handleEscolherDistancias}>
            <Icon name="location-outline" size={22} color="#4FC3F7" style={styles.icon} />
            <Text style={styles.menuButtonText}>Escolher distâncias</Text>
          </TouchableOpacity>

        </View>
      </View>

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
    //backgroundColor: '#0B1A2A',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Adicionei só para garantir que fica SEMPRE por cima da WebView
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

  menuTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 50,
  },

 buttonContainer: {
    width: '85%',
  },

  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12263A', 
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    // Removida a borda anterior para destacar o azul no fundo branco
  },

  icon: {
    marginRight: 12,
    color: '#FFFFFF', // Ícone passa a ser branco para contrastar com o botão azul
  },

  menuButtonText: {
    color: '#FFFFFF', // Texto passa a ser branco para contrastar com o botão azul
    fontSize: 18,
    fontWeight: '500',
  },

  footerContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },

  footerText: {
    color: '#000000', // Texto da versão em preto para ser legível no branco
    fontSize: 13,
    opacity: 0.5,
  },
});