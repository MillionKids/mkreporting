import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, WebView } from 'react-native';
import UserAgentIOS from "rn-ios-user-agent";

import Navbar from './Navbar';
import Database from '../server/db';

type Props = {
  onClose: () => void,
  uri: String
}

class MKWebView extends React.PureComponent {

  constructor(props: Props) {
    super(props);
    this.webView = null;
    this.state = {
      currentURL: '',
      location: { },
      canGoBack: false,
      canGoForward: false,
    };

    this.sendPostMessage = this.sendPostMessage.bind(this);
  }

  componentWillMount() {
    const url = 'https://freegeoip.net/json/';

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          location: {
            countryName: responseJson.country_name,
            regionName: responseJson.region_name,
            city: responseJson.city,
          }
        });
      })
      .catch((error) => {
        //console.error(error);
      });
  }

  onMessage = (event) => {
    console.log( "On Message", event.nativeEvent.data );
    const headers = event.nativeEvent.data;

    Database.setEmailHeader(this.state.location, headers);
  };

  sendPostMessage() {
    console.log( "Sending post message" );
    this.webView.postMessage("Post message from react native");
    const url = this.state.currentURL;
    if (url.includes('google')) {
      this.webView.injectJavaScript("window.postMessage(document.getElementById('raw_message_text').innerHTML)");
    } else if (url.includes('yahoo')) {
      this.webView.injectJavaScript("window.postMessage(document.documentElement.innerHTML)");
    } else {
      this.webView.injectJavaScript("window.postMessage(document.getElementsByTagName('textarea')[0].value)");
    }
  }

  render() {
    const desktopUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36';
    UserAgentIOS.set(desktopUA);
    const jsCode = "window.postMessage(document.documentElement.innerHTML)";
    const patchPostMessageFunction = function() {
      const originalPostMessage = window.postMessage;
      const patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };
      patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
      };
      window.postMessage = patchedPostMessage;
    };
    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
    return (
      <View style={{flex: 1}}>
        <Navbar
          viewType={'web'}
          onSend={this.sendPostMessage}
          onClose={this.props.onClose}
          uri={this.props.uri}
          // if we didn't wrap the back and forward, the render will try to process the webview's
          // function, which is null
          onBack={() => { this.webView.goBack() }}
          onForward={() => { this.webView.goForward() }}
          backDisabled={!this.state.canGoBack}
          forwardDisabled={!this.state.canGoForward}
        />
        <WebView
          source={{uri: this.props.uri }}
          userAgent={desktopUA}
          style={{marginTop: 20}}
          injectedJavaScript={patchPostMessageJsCode}
          ref={( webView ) => this.webView = webView}
          onMessage={this.onMessage}
          onNavigationStateChange={(event) => this.setState({
            currentURL: event.url,
            canGoBack: event.canGoBack,
            canGoForward: event.canGoForward
          }) }
        />
      </View>
    );
  }
}

export default MKWebView;