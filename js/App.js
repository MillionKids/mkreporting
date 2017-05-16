import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
} from 'react-native';

import MKChat from './MKChat';
import OnboardingView from './OnboardingView';
import firebaseInit from '../server/firebase';
firebaseInit();

export default class App extends React.Component {

  state = {
    onboarded: true,
  };

  componentWillMount() {
    AsyncStorage.getItem('onboard')
      .then((onboarded) => {
        if (!onboarded) {
          this.setState({ onboarded: false })
        }
      })
      .catch(() => {
        console.log('caught')
      })

  }

  render() {
    if (this.state.onboarded) {
      return (
        <MKChat />
      )
    }
    return (
      <OnboardingView onClose={this._closeModal}/>
    )
  }

  _closeModal = () => {
    this.setState({ onboarded: true });
    AsyncStorage.setItem('onboard', 'key');
  };

}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
});
