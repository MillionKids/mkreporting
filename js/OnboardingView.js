import React, {Component} from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';
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
{/*______MK Logo______*/}
        <View style={{backgroundColor: '#15B4F1', justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 250, height: 30}}
          source={require('mkreporting/resources/logo.png')}
        />
        <Text></Text>
        <Image
          style={{width: 150, height: 20}}
          source={require('mkreporting/resources/millionkids.png')}
        />
        <Text style={{paddingBottom: 50}}></Text>
        </View>
{/*______Onboarding 1______*/}
          <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style={{width: 300, height: 200}}
            source={require('mkreporting/resources/Onboarding1.png')}
            />
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>DONT LET THEM GET AWAY</Text>
            <Text></Text>
            <Text style ={{paddingLeft: 30, paddingRight: 30, paddingBottom: 50}}>Don’t let them get away! If anyone asks you for pictures or private information online, you can report them!</Text>
          </View>
{/*______Onboarding 2______*/}
          <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 300, height: 200}}
                source={require('mkreporting/resources/Onboarding2.png')}
              />
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text>WORK WITH US</Text>
              <Text></Text>
              <Text style ={{paddingLeft: 30, paddingRight: 30, paddingBottom: 70}}>By sending your information, we can work together to stop online exploitation.</Text>
          </View>
{/*______Onboarding 3______*/}
          <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 300, height: 200}}
              source={require('mkreporting/resources/Onboarding3.png')}
            />
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>DOUBLE TAP</Text>
            <Text></Text>
            <Text style ={{paddingLeft: 30, paddingRight: 30}}>Double tap top right corner to hide our conversation. You are a secret agent. Double tapping will flip to a fake messenger screen.</Text>
            <TouchableHighlight style={{padding: 10, backgroundColor: '#15B4F1', marginTop: 20}}
                                onPress={() => { this.props.onClose() }}>
              <Text style={{color: 'white'}}>Next</Text>
            </TouchableHighlight>
          </View>


        </IndicatorViewPager>
      </Modal>
    )
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={4} />;
  }
}

export default OnboardingView;
