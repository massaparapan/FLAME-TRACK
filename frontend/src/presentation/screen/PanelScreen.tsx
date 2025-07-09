import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

function ThingBoardDashboard() {
  const baseUrl =
    'http://iot.ceisufro.cl:8080/dashboard/df348fc0-47b2-11f0-a76f-af9873efe2ab/';
  const widgetId = '218f7a9e-d132-cd06-067f-78e7e69150e5';
  const thingboardLoginUrl = 'http://iot.ceisufro.cl:8080';
  const defaultToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlLm9ydGl6MDZAdWZyb21haWwuY2wiLCJ1c2VySWQiOiIwOGZmYTllMC00MTk5LTExZjAtYTc2MC1jMzRiODMzNjg2MTIiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjBhZTk2NmQ2LTczZjktNGJkNi1iZTgwLWY3ODBjMTYwNzQwZCIsImV4cCI6MTc1MTk0MDk5MywiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE3NTE5MzE5OTMsImZpcnN0TmFtZSI6IkVzdGViYW4iLCJsYXN0TmFtZSI6Ik9ydGl6IiwiZW5hYmxlZCI6dHJ1ZSwiaXNQdWJsaWMiOmZhbHNlLCJ0ZW5hbnRJZCI6IjhlMWQzNDIwLTQxOTAtMTFmMC1hNzYwLWMzNGI4MzM2ODYxMiIsImN1c3RvbWVySWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAifQ.Paji4laFiQUQiOJtoDFFzBYxUU-IAA9ocfhV0UJCpx5Bo12OuBc_5MeptLu6O_DgaHClphdxYEUr4UnNumO5mg';

  const [accessToken, setAccessToken] = useState(defaultToken);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Conectando...');
  const webViewRef = useRef<WebView>(null);

  const dashboardUrl = `${baseUrl}?token=${accessToken || defaultToken}&kiosk=true&mobile=true`;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setConnectionStatus('Cargando...');

    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
        setConnectionStatus('Error de conexión');
      }
    }, 15000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [accessToken, dashboardUrl, isLoading]);

  const handleWebViewLoad = () => {
    setIsLoading(false);
    setConnectionStatus('Conectado');
    setHasError(false);
  };

  const handleWebViewError = (syntheticEvent: { nativeEvent: any; }) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    setHasError(true);
    setIsLoading(false);
    setConnectionStatus('Error de conexión');
  };

  const reloadDashboard = () => {
    setIsLoading(true);
    setHasError(false);
    setConnectionStatus('Recargando...');
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const showTokenDialog = () => {
    Alert.prompt(
      'Token de Acceso',
      'Ingresa tu token de acceso de ThingBoard:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: (tokenInput) => {
            if (tokenInput && tokenInput.trim() !== '') {
              setAccessToken(tokenInput.trim());
            }
          },
        },
      ],
      'plain-text',
      accessToken
    );
  };

  const openThingBoardLogin = () => {
    // En React Native necesitarías usar Linking para abrir URLs externas
    // import { Linking } from 'react-native';
    // Linking.openURL(thingboardLoginUrl);
    
    Alert.alert(
      'Iniciar Sesión',
      'Para obtener un token válido, necesitas iniciar sesión en ThingBoard desde un navegador web.',
      [
        {
          text: 'Entendido',
          style: 'default',
        },
      ]
    );
  };

  const showInfo = () => {
    Alert.alert(
      'Información del Dashboard',
      `Servidor: iot.ceisufro.cl
Puerto: 8080
Estado: ${connectionStatus}
Widget ID: ${widgetId}
Token configurado: ${
        accessToken ? accessToken.substring(0, 20) + '...' : 'No configurado'
      }`,
      [{ text: 'Cerrar' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: dashboardUrl }}
          style={styles.webView}
          onLoad={handleWebViewLoad}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
          startInLoadingState={true}
          scalesPageToFit={true}
          bounces={false}
          scrollEnabled={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          onShouldStartLoadWithRequest={(request) => {
            return request.url.includes('iot.ceisufro.cl') || request.url.includes('localhost');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  webViewContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  webView: {
    flex: 1,
  },
});

export default ThingBoardDashboard;