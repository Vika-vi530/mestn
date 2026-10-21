import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://vika-vi530.github.io/mestn/adaptive-app/" }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
