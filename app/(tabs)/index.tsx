import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import MainMenu from '@/components/MainMenu';

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [initialLoc, setInitialLoc] = useState<Location.LocationObject | null>(null);
  
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
      const mockPos = { coords: { latitude: ${loc.coords.latitude}, longitude: ${loc.coords.longitude}, accuracy: ${loc.coords.accuracy}, altitude: null, heading: null, speed: null }, timestamp: Date.now() };
      navigator.geolocation.getCurrentPosition = (success) => success(mockPos);
      navigator.geolocation.watchPosition = (success) => { success(mockPos); return 1; };
      true;
    `;
  };

  useEffect(() => {
    if (initialLoc && webViewRef.current) {
      webViewRef.current.injectJavaScript(getInjectGPS(initialLoc));
    }
  }, [initialLoc]);

  if (errorMsg) return <View style={styles.center}><Text style={styles.text}>{errorMsg}</Text></View>;
  if (!hasPermissions) return <View style={styles.center}><Text style={styles.text}>A iniciar...</Text></View>;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://projeto-final-lei-ipt.github.io/PlanetarySystemV2/webview/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        injectedJavaScriptBeforeContentLoaded={getInjectGPS(initialLoc)}
      />

      {/* Passamos o webViewRef e o setMenuVisible para o Menu se auto-gerir */}
      {menuVisible && (
        <MainMenu 
          setMenuVisible={setMenuVisible} 
          webViewRef={webViewRef} 
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