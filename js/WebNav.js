import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

import OnboardingView from './OnboardingView';

class WebNav extends React.PureComponent {

  state = {
    viewingInstructions: false,
  };

  render() {
    if (this.state.viewingInstructions) {
      return (
        <OnboardingView onClose={this._closeModal}/>
      )
    }
    return (
      <View style={styles.container}>
        <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}}
                            onPress={this.props.onSend}>
          <Text style={{color: 'white'}}>Report</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{padding: 10, backgroundColor: 'red', marginTop: 20}}
                            onPress={this.props.onClose}>
          <Text style={{color: 'white'}}>Close poo</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{padding: 10, backgroundColor: 'cadetblue', marginTop: 20}}
                            onPress={this.openInstructions}>
          <Text style={{color: 'white'}}>instructions</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _closeModal = () => {
    this.setState({ viewingInstructions: false })
  };

  openInstructions = () => {
    this.setState({ viewingInstructions: true })
  };

  renderInstructions() {
    const { uri } = this.props;

    if (uri.includes('google')) {
    } else if (uri.includes('yahoo')) {
    } else {
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
})

export default WebNav;