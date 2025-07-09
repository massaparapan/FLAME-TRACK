import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ThingBoardDashboard = () => {
  const dashboardUrl = 'http://iot.ceisufro.cl:8080/dashboard/df348fc0-47b2-11f0-a76f-af9873efe2ab?publicId=43598140-420e-11f0-a760-c34b83368612';

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: dashboardUrl }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="compatibility"
        onShouldStartLoadWithRequest={(request) =>
          request.url.includes('iot.ceisufro.cl') || request.url.includes('localhost')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ThingBoardDashboard;
