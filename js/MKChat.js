import React from 'react';
import _ from 'lodash';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import Navbar from './Navbar';

import DefaultMessages from '../data/messages';
import Dictionary from '../data/dictionary';
import EmailDict from '../data/links';
import MKWebView from './MKWebView';

type Props = {}

export default class MKChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      nextPage: null,
      hasNextPage: true,
      typingText: null,
      isLoadingEarlier: false,
      questioning: false,
      series: { questions: [], current: 0, },
      webViewVisible: false,
      webURI: '',
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

  setModalVisible(uri: String, visible: Boolean) {
    this.setState({ webURI: uri, webViewVisible: visible });
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
    if (EmailDict[lowerMsgText]) {
      const uri = EmailDict[lowerMsgText];

      console.log(uri);

      this.setModalVisible(uri, !this.state.webViewVisible);
    }

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


  render() {
    return (
      <View style={styles.appContainer}>
        <Navbar viewType={'chat'} />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.hasNextPage}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}

          user={{
            _id: 1,
            name: 'Developer'
          }}

          renderFooter={this.renderFooter}
        />
        <Modal
          onRequestClose={() => {alert("Modal has been closed.")}}
          visible={this.state.webViewVisible}
          animationType={"slide"}
        >
          <MKWebView
            uri={this.state.webURI}
            onClose={() => this.setModalVisible('', !this.state.webViewVisible) }
          />
        </Modal>
      </View>
    );
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
