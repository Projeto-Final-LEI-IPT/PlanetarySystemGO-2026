import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// Importar o teu novo componente de menu
import GameMenu from '@/components/GameMenu';

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [initialLoc, setInitialLoc] = useState<Location.LocationObject | null>(null);
  
  // Estado para controlar a visibilidade do menu nativo
  const [menuVisible, setMenuVisible] = useState(true);

  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      let { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

      if (locationStatus === 'granted' && cameraStatus === 'granted') {
        setHasPermissions(true);
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
          .then(loc => setInitialLoc(loc))
          .catch(e => setErrorMsg('Erro a ler o GPS. Tenta ir para a rua.'));
      } else {
        setErrorMsg('É necessário conceder permissões de câmara e GPS para usar a aplicação.');
      }
    })();
  }, []);

  const getInjectGPS = (loc: Location.LocationObject | null) => {
    if (!loc) return '';
    return `
      const mockPos = {
        coords: { latitude: ${loc.coords.latitude}, longitude: ${loc.coords.longitude}, accuracy: ${loc.coords.accuracy}, altitude: null, heading: null, speed: null },
        timestamp: Date.now()
      };
      navigator.geolocation.getCurrentPosition = (success) => success(mockPos);
      navigator.geolocation.watchPosition = (success) => { success(mockPos); return 1; };
      true;
    `;
  };

  // Oculta o menu original do website
  const hideWebMenuScript = `
    const style = document.createElement('style');
    style.innerHTML = 'header, nav { display: none !important; }'; 
    document.head.appendChild(style);
    true;
  `;

  useEffect(() => {
    if (initialLoc && webViewRef.current) {
      webViewRef.current.injectJavaScript(getInjectGPS(initialLoc));
    }
  }, [initialLoc]);

  // --- Funções para lidar com os cliques do menu ---
  const handleJogoRapido = () => {
    console.log('Clicou em: Jogo Rápido');
    setMenuVisible(false); // Esconde o menu nativo e revela o jogo na WebView
    // if (webViewRef.current) webViewRef.current.injectJavaScript('if(window.startQuickGame) window.startQuickGame();');
  };

  const handleInstrucoes = () => {
    console.log('Clicou em: Instruções');
    setMenuVisible(false); // Esconde o menu nativo e revela o jogo na WebView
    // if (webViewRef.current) webViewRef.current.injectJavaScript('if(window.showInstructions) window.showInstructions();');
  };

  const handleEscolherDistancias = () => {
    console.log('Clicou em: Escolher distancias');
    setMenuVisible(false); // Esconde o menu nativo e revela o jogo na WebView
    // if (webViewRef.current) webViewRef.current.injectJavaScript('if(window.showDistanceSelection) window.showDistanceSelection();');
  };

  if (errorMsg) return <View style={styles.center}><Text style={styles.text}>{errorMsg}</Text></View>;
  if (!hasPermissions) return <View style={styles.center}><Text style={styles.text}>A iniciar...</Text></View>;

  return (
    <SafeAreaView style={styles.container}>
      {/* A WEBVIEW (jogo em fundo) */}
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://projeto-final-lei-ipt.github.io/PlanetarySystemV2/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        injectedJavaScriptBeforeContentLoaded={getInjectGPS(initialLoc)}
        injectedJavaScript={hideWebMenuScript} // Injeta o CSS para esconder o menu da web após a página carregar
      />

      {/* O TEU NOVO COMPONENTE DE MENU */}
      {menuVisible && (
        <GameMenu 
          onJogoRapido={handleJogoRapido}
          onInstrucoes={handleInstrucoes}
          onEscolherDistancias={handleEscolherDistancias}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  webview: { flex: 1 },
  text: { color: 'white', padding: 20, textAlign: 'center' },
});