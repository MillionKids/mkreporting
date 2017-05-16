import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OnboardingView from './OnboardingView';

// More accurately, the buttons for the web nav
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
        <View style={[styles.left]}>
          {this.createButton('chevron-left', this.props.onBack, 'Back')}
          {this.createButton('chevron-right', this.props.onForward, 'Forward')}
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {this.createButton('report',
            this.props.onSend,
            'Report',
            {fontWeight: 'bold', color: 'gold'},
            'gold'
          )}
        </View>
        <View style={[styles.right]}>
          {this.createButton('help', this.openInstructions, 'Help')}
          {this.createButton('close', this.props.onClose, 'Close')}
        </View>
      </View>
    )
  }

  createButton(iconName, action, text='', styling=null, color='white') {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={action}>
        <View style={styles.icon}>
            <Icon name={iconName} size={30} color={color} />
          <Text style={[styles.text, styling]}>{text}</Text>
        </View>
      </TouchableOpacity>
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
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    marginTop: 15
  },
  icon: {
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 11,
  }
});

export default WebNav;