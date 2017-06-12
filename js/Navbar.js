import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import WebNav from "./WebNav";

const Navbar = (props) => {
  const { viewType } = props;
  return (
    <View style={styles.navbarContainer}>
      <StatusBar barStyle="light-content" />
      {viewType === 'chat' &&
        <View>
          <TouchableOpacity onPress={props.onBotSwitch}>
            <Text style={styles.navbarText}>{props.botName}</Text>
          </TouchableOpacity>
        </View>
      }
      {viewType === 'web' && <WebNav {...props}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: '#15B4F1',
    height: 70,
  },
  navbarText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 30,
    alignSelf: 'center'
  }
});

export default Navbar;
