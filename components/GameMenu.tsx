import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/images/logo.png';

interface GameMenuProps {
  onJogoRapido: () => void;
  onInstrucoes: () => void;
  onEscolherDistancias: () => void;
}

export default function GameMenu({ onJogoRapido, onInstrucoes, onEscolherDistancias }: GameMenuProps) {
  return (
    <SafeAreaView style={styles.menuOverlay}>
      <View style={styles.centerContainer}>

        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.menuButton} onPress={onJogoRapido}>
            <Icon name="flash-outline" size={22} color="#4FC3F7" style={styles.icon} />
            <Text style={styles.menuButtonText}>Jogo Rápido</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={onInstrucoes}>
            <Icon name="information-circle-outline" size={22} color="#4FC3F7" style={styles.icon} />
            <Text style={styles.menuButtonText}>Instruções</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={onEscolherDistancias}>
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
    backgroundColor: '#0B1A2A', // azul escuro moderno
    justifyContent: 'center',
    alignItems: 'center',
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