import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import WebNav from "./WebNav";

const Navbar = (props) => {
  const { viewType } = props;
  return (
    <View style={styles.navbarContainer}>
      <StatusBar
        barStyle="light-content"
      />
      {
        viewType === 'chat' &&
        <Text style={styles.navbarText}>
          Porty
        </Text>
      }
      {
        viewType === 'web' &&
          <WebNav {...this.props}/>
      }

    </View>
  );

};

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: 'rgb(36, 66, 115)',
    height: 70,
    alignItems: 'center'
  },
  navbarText: {
    fontSize: 30,
    color: '#fff',
    marginTop: 20
  }
});

export default Navbar;
