import React, {Component} from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

class OnboardingView extends React.PureComponent {
  render() {
    return (
      <Modal
        animationType={'slide'}
        visible={true}
      >
        <IndicatorViewPager
          style={{flex: 1}}
          indicator={this._renderDotIndicator()}
        >
          <View style={{backgroundColor: 'cadetblue'}}>
            <Text>page one</Text>
          </View>
          <View style={{backgroundColor: 'cornflowerblue'}}>
            <Text>page two</Text>
          </View>
          <View style={{backgroundColor: '#1AA094'}}>
            <Text>page three</Text>
            <TouchableHighlight style={{padding: 10, backgroundColor: 'red', marginTop: 20}}
                                onPress={() => { this.props.onClose() }}>
              <Text style={{color: 'white'}}>Close mah poo</Text>
            </TouchableHighlight>
          </View>
        </IndicatorViewPager>
      </Modal>
    )
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }
}

export default OnboardingView;