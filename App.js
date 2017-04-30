import React from 'react';
import _ from 'lodash';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  WebView
} from 'react-native';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import DeviceInfo from 'react-native-device-info';
import * as firebase from 'firebase';

import Navbar from './Navbar';

import DefaultMessages from './data/messages';
import Dictionary from './data/dictionary';

// import ActionsMessages from './api/messages';

import firebaseInit from './server/firebase';


firebaseInit();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      messages: [],
      nextPage: null,
      hasNextPage: true,
      typingText: null,
      isLoadingEarlier: false,
      questioning: false,
      series: { questions: [], current: 0, },
      location: { }
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.setOldMessages = this.setOldMessages.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState({ messages: DefaultMessages });
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    if (!this.state.nextPage) {
      // ActionsMessages.getMessages(this.setOldMessages)
    } else {
      // ActionsMessages.loadMoreMessages(this.state.nextPage, this.setOldMessages)
    }
  }

  setOldMessages(oldMessages, hasNextPage, nextPage) {
    this.setState({ isLoadingEarlier: true });

    if (this._isMounted === true) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.prepend(previousState.messages, oldMessages),
          isLoadingEarlier: false,
          hasNextPage,
          nextPage
        };
      });
    };
  }

  onSend(messages = []) {
    const lastMessage = messages[0];

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, lastMessage),
      };
    });

    this.setState({ typingText: 'Syncano is typing...' });
    this.answerQuery(lastMessage);
    // ActionsMessages.addMessage(lastMessage, () => {
    //   this.setState({ typingText: 'Syncano is typing...' });
    //   this.answerQuery(lastMessage);
    // });
    firebase.database().ref('users/test').set({
      username: "huyanh",
      message: lastMessage,
      location: this.state.location,
      device: DeviceInfo.getUniqueID(),
    });
    console.log(this.state.messages);
  }

  answerQuery(message) {
    let lowerMsgText = _.toLower(message.text);
    lowerMsgText = lowerMsgText.replace(/[&\/\\#,+()$~%.'":*?<>{}!]/g, '');

    let messageArray = lowerMsgText.split(' ');
    // const tempMessageArray = _.remove(messageArray, (item) => item === 'script' || item === 'scripts' || item === 'endpoint' || item === 'endpoints');
    //
    // if (tempMessageArray.length >= 2)
    //   messageArray.push('script endpoint')
    // else
    //   messageArray = _.concat(messageArray, tempMessageArray);

    const receive = this.setAnswer(messageArray);
    this.onReceive(receive);
  }

  setAnswer(messageArray) {
    let answer;

    if (this.state.questioning)
      answer = this.mapSeries();
    else
      answer = this.mapSimpleQuery(messageArray);

    const customMsg = answer.info ? answer.info : `Sorry, I don't know anything :( It looks like you should more refine your message.`

    return (!answer.hasOwnProperty('image') && _.isObject(answer)) ? customMsg : answer;
  }

  // maps response to questions for first time
  mapSimpleQuery(messageArray) {
    let answer = {};
    messageArray.map(word => answer.questions = Dictionary[word]);
    if (!answer.questions)
      return answer;
    if (answer.questions.length > 1) {
      this.setState({
        questioning: true,
        series: { questions: answer.questions, current: 1 }
      });
    }
    answer.info = answer.questions[0];
    return answer;
  }

  // TODO: do something with the response
  // maps each subquestion, if youre at the end then return the last question
  mapSeries() {
    if (this.state.series.current === this.state.series.questions.length - 1)
      this.setState({ questioning: false });
    const answer = { info: this.state.series.questions[this.state.series.current] };
    this.setState({ series: {
      questions: this.state.series.questions,
      current: this.state.series.current + 1
    }});
    return answer;
  }

  //TODO: better way of doing this is probably manually calling chat.append()

  // Prepares answer and saves it to state and sends it to server, then bot stops typing
  onReceive(obj) {
    const newMessage = {
      _id: Date.now(),
      text: obj.text || obj,
      user: {
        _id: 2,
        name: 'Porty',
        avatar: 'https://pbs.twimg.com/profile_images/692354435738161152/UAkVM9-p.png'
      },
      image: obj.image || null
    }

    // ActionsMessages.addMessage(newMessage, (newMessage) => {
    //   this.setState((previousState) => {
    //     return {
    //       messages: GiftedChat.append(previousState.messages, newMessage),
    //       typingText: null
    //     };
    //   });
    // });
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, newMessage),
        typingText: null
      };
    });
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  onMessage( event ) {
    console.log( "On Message", event.nativeEvent.data );
  }

  sendPostMessage() {
    console.log( "Sending post message" );
    this.webView.postMessage("Post message from react native");
  }

  render() {
     return (
       <View style={{flex: 1}}>
           <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}}
                               onPress={() => this.sendPostMessage()}>
             <Text style={{color: 'white'}}>Send post message from react native</Text>
           </TouchableHighlight>
          <WebView
            source={{uri: 'https://popping-heat-6062.firebaseapp.com'}}
            style={{marginTop: 20}}
            ref={( webView ) => this.webView = webView}
            onMessage={this.onMessage}
          />
       </View>
    );
    // return (
    //   <View style={styles.appContainer}>
    //     <Navbar />
    //     <GiftedChat
    //       messages={this.state.messages}
    //       onSend={this.onSend}
    //       loadEarlier={this.state.hasNextPage}
    //       onLoadEarlier={this.onLoadEarlier}
    //       isLoadingEarlier={this.state.isLoadingEarlier}
    //
    //       user={{
    //         _id: 1,
    //         name: 'Developer'
    //       }}
    //
    //       renderFooter={this.renderFooter}
    //     />
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
