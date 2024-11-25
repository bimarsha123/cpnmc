import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FacebookEmbed = ({ url, width = 550 }) => {
    const iframeHtml = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f9f9f9;
          }
          .fb-post {
            margin: auto;
          }
        </style>
      </head>
      <body>
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" 
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0"></script>
        <div class="fb-post" 
          data-href="${url}" 
          data-width="${width}"></div>
      </body>
    </html>
  `;

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: iframeHtml }}
                style={{ flex: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FacebookEmbed;
