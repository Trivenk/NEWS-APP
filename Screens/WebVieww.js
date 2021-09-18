import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
const WebVieww = ({route}) => {
  return <WebView source={{uri:route?.params?.url}} />;
};

export default WebVieww;
