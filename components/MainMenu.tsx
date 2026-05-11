import React, { RefObject, useState } from 'react';
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
  const [showDistances, setShowDistances] = useState(false);

  // --- LÓGICA INTERNA DO MENU ---
  const handleStartGame = (factor: number) => {
    console.log(`Arrancando jogo com fator X${factor}`);
    setMenuVisible(false); // Esconde o menu
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`window.startGame(${factor}); true;`);
    }
  };

  const handleJogoRapido = () => {
    handleStartGame(1);
  };

  const handleInstrucoes = () => {
    console.log('Clicou em: Instruções');
    // Aqui podes decidir se abre um modal de instruções ou se vai para a web
  };

  const handleEscolherDistancias = () => {
    setShowDistances(true);
  };

  // --- O TEU DESIGN INTACTO ---
  return (
    <SafeAreaView style={styles.menuOverlay}>
      <View style={styles.centerContainer}>

        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

        <View style={styles.buttonContainer}>
          {!showDistances ? (
            <>
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
            </>
          ) : (
            <>
              <Text style={styles.subMenuTitle}>Selecione a Escala:</Text>
              
              <TouchableOpacity style={styles.menuButton} onPress={() => handleStartGame(1)}>
                <Icon name="resize-outline" size={22} color="#4FC3F7" style={styles.icon} />
                <Text style={styles.menuButtonText}>Escala 1x (Perto)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuButton} onPress={() => handleStartGame(2)}>
                <Icon name="resize-outline" size={22} color="#4FC3F7" style={styles.icon} />
                <Text style={styles.menuButtonText}>Escala 2x</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuButton} onPress={() => handleStartGame(3)}>
                <Icon name="resize-outline" size={22} color="#4FC3F7" style={styles.icon} />
                <Text style={styles.menuButtonText}>Escala 3x</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuButton} onPress={() => handleStartGame(5)}>
                <Icon name="resize-outline" size={22} color="#4FC3F7" style={styles.icon} />
                <Text style={styles.menuButtonText}>Escala 5x (Longe)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuButton, {marginTop: 20, borderColor: 'rgba(255,255,255,0.3)'}]} onPress={() => setShowDistances(false)}>
                <Icon name="arrow-back-outline" size={22} color="#FFFFFF" style={styles.icon} />
                <Text style={styles.menuButtonText}>Voltar</Text>
              </TouchableOpacity>
            </>
          )}
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
    backgroundColor: '#0B1A2A', // azul escuro moderno (O teu estilo)
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

  subMenuTitle: {
    color: '#4FC3F7',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },

  buttonContainer: {
    width: '85%',
  },

  menuButton: {
    flexDirection: 'row', // IMPORTANTE para ícone + texto
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)', // leve transparência
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(79,195,247,0.3)', // azul suave
  },

  icon: {
    marginRight: 12,
  },

  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },

  footerContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },

  footerText: {
    color: '#FFFFFF',
    fontSize: 13,
    opacity: 0.5,
  },
});