import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react'; // Importar useRef
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Guardar a localização exata nativa
  const [initialLoc, setInitialLoc] = useState<Location.LocationObject | null>(null);
  
  // Criar uma referência para a WebView para lhe podermos enviar JavaScript "a quente"
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      // Pedir permissões de localização e câmera
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      let { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

      if (locationStatus === 'granted' && cameraStatus === 'granted') {
        setHasPermissions(true);
        // Tentar obter a localização, mas deixar o código continuar (não usar 'await' aqui)
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
          .then(loc => {
            setInitialLoc(loc);
          })
          .catch(e => {
            setErrorMsg('Erro a ler o GPS. Tenta ir para a rua.');
          });
      } else {
        setErrorMsg('É necessário conceder permissões de câmara e GPS para usar a aplicação.');
      }
    })();
  }, []);

  // SCRIPT INJETADO: Engana a WebView, dizendo-lhe que a localização dela
  // é exatamente igual à localização que o React Native/Expo acabou de descobrir.
  const getInjectGPS = (loc: Location.LocationObject | null) => {
    if (!loc) return '';
    return `
      const mockPos = {
        coords: {
          latitude: ${loc.coords.latitude},
          longitude: ${loc.coords.longitude},
          accuracy: ${loc.coords.accuracy},
          altitude: null,
          heading: null,
          speed: null
        },
        timestamp: Date.now()
      };
      
      // Substitui as funções normais de GPS do site pelas nossas
      navigator.geolocation.getCurrentPosition = (success) => success(mockPos);
      navigator.geolocation.watchPosition = (success) => {
        success(mockPos);
        return 1;
      };
      true;
    `;
  };

  // Efeito Reativo: Assim que o GPS captar a posição, injeta-a na WebView já carregada.
  useEffect(() => {
    if (initialLoc && webViewRef.current) {
      console.log('GPS captado! Injetando JavaScript na WebView...');
      webViewRef.current.injectJavaScript(getInjectGPS(initialLoc));
    }
  }, [initialLoc]); // Este efeito corre quando 'initialLoc' muda

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: 'center', padding: 20, color: 'white' }}>{errorMsg}</Text>
      </View>
    );
  }

  // Esperar apenas pelas permissões, não pela localização exata.
  if (!hasPermissions) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'white' }}>A pedir permissões e a iniciar a câmara...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef} // Atribuir a referência
        source={{ uri: 'https://projeto-final-lei-ipt.github.io/PlanetarySystemV2/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        geolocationEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        // Tenta injetar logo no início, se o GPS já estiver pronto
        injectedJavaScriptBeforeContentLoaded={getInjectGPS(initialLoc)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
});